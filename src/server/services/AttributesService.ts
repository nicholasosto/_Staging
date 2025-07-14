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

	public static ModAttribute(player: Player, attributeKey: AttributeKey, amount: number): AttributesDTO | undefined {
		const attrs = DataService.GetProfileDataByKey(player, "Attributes");
		if (attrs === undefined) return undefined;

		// Calculated amounts
		const newAmount = attrs[attributeKey] + amount;
		const newAvailable = attrs.AvailablePoints - amount;
		const newSpent = attrs.SpentPoints + amount;

		/* Validation */
		if (newAvailable < 0 || newSpent < 0 || newAmount < 1 || newAmount > 999) {
			warn(
				`[AttributesService] Invalid attribute modification for player ${player.Name}: ${attributeKey}, ${amount}`,
			);
			return undefined;
		}

		/* Set new values */
		attrs[attributeKey] = newAmount;
		attrs.AvailablePoints -= amount;
		attrs.SpentPoints += amount;

		if (DataService.SetProfileDataByKey(player, "Attributes", attrs) === false) {
			warn(`[AttributesService] Failed to set attribute ${attributeKey} for player ${player.Name}.`);
			return undefined;
		}
		ResourcesService.Recalculate(player);
		return this.FetchAttributes(player);
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
