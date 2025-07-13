/// <reference types="@rbxts/types" />

/**
 * ### AttributesService
 * Server-side service for validating and mutating player attributes.
 *
 * @module     Server/Services/AttributesService
 * @owner      Trembus
 * @since      0.2.0
 * @lastUpdate 2025-07-12
 *
 * @remarks
 * Handles attribute changes and recalculations on players.
//* Imports ======================================================================= */
import { AttributeKey, AttributesDTO, clampAttr } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataService } from "./DataService";
import { ResourcesService } from "./ResourcesService";
import { RunService } from "@rbxts/services";

// Service name for debug logs
const SERVICE_NAME = "AttributesService";
/*  Service ====================================================================== */
export default class AttributesService {
	private static _instance: AttributesService | undefined;

	private constructor() {
		if (RunService.IsStudio()) print(`${SERVICE_NAME} started`);
	}

	public static Start(): AttributesService {
		if (this._instance === undefined) {
			this._instance = new AttributesService();
		}
		return this._instance;
	}

	/**
	 * Shutdown and cleanup the service.
	 */
	public static Destroy(): void {
		this._instance?.destroyInternal();
		this._instance = undefined;
	}

	public static ModifyAttribute(
		player: Player,
		attributeKey: AttributeKey,
		amount: number,
	): AttributesDTO | undefined {
		const attrs = DataService.GetProfileDataByKey(player, "Attributes");
		if (attrs === undefined) {
			warn(`ModifyAttribute: No attributes found for player ${player.Name}.`);
			return undefined;
		}
		const newAmount = attrs[attributeKey] + amount;
		const newAvailable = attrs.AvailablePoints - amount;
		const newSpent = attrs.SpentPoints + amount;
		if (newAvailable < 0) {
			warn(`ModifyAttribute: Not enough available points for player ${player.Name}.`);
			return undefined;
		}
		if (newSpent < 0) {
			warn(`ModifyAttribute: Spent points cannot go negative for player ${player.Name}.`);
			return undefined;
		}
		if (newAmount < 1 || newAmount > 999) {
			warn(`ModifyAttribute: New value for ${attributeKey} is out of bounds for player ${player.Name}.`);
			return undefined;
		}

		attrs[attributeKey] = newAmount;
		attrs.AvailablePoints -= amount;
		attrs.SpentPoints += amount;

		if (DataService.SetProfileDataByKey(player, "Attributes", attrs) === false) {
			warn(`ModifyAttribute: Failed to set profile data for ${player.Name}.`);
			return undefined;
		}
		ResourcesService.Recalculate(player);
		return this.FetchAttributes(player);
	}
	private static _validateMod(attri: AttributesDTO | undefined, attrKey: AttributeKey, delta: number): boolean {
		let validationMessage = "Attribute Modification Validation: ";

		if (attri === undefined) {
			validationMessage += "Attributes data is undefined.";
			warn(validationMessage);
			return false;
		}
		const newAvailable = attri.AvailablePoints + delta;
		const newAttributeValue = attri[attrKey] + delta;

		/* - Check if attribute attempted to be modified is valid - */
		if (attri[attrKey] === undefined) {
			validationMessage += `Attribute ${attrKey} does not exist. `;
			return false;
		}
		/* - Check if new attribute value is within valid range - */
		if (newAttributeValue < 1 || newAttributeValue > 999) {
			validationMessage += `New value for ${attrKey} is out of bounds: ${newAttributeValue}. `;
			return false;
		}
		/* - Check if available points after modification is valid - */
		if (newAvailable < 0) {
			validationMessage += `New available points after modification is negative: ${newAvailable}. `;
			return false;
		}

		/* - Check Spent Points - */
		if (attri.SpentPoints + delta < 0) {
			validationMessage += `Spent points would go negative after modification: ${attri.SpentPoints + delta}. `;
			return false;
		}

		validationMessage += `New Value: ${attri[attrKey]}, Available Points: ${attri.AvailablePoints}`;
		return true;
	}

	/**
	 * Fetches the profile data for a player.
	 * @param player The player whose profile data is to be fetched.
	 * @returns The player's attributes data.
	 */
	/** Fetch raw attributes from the profile */
	public static FetchAttributes(player: Player) {
		return DataService.GetProfileDataByKey(player, "Attributes");
	}

	// Private cleanup helper
	private destroyInternal() {
		// TODO: cleanup events if any
		if (RunService.IsStudio()) warn(`${SERVICE_NAME} destroyed`);
	}
}
