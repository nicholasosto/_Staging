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
 */

/* =============================================== Imports ===================== */
import { AttributeKey, clampAttr } from "shared/definitions/ProfileDefinitions/Attributes";
import { DataService } from "./DataService";
import { ResourcesService } from "./ResourcesService";
import { RunService } from "@rbxts/services";

// Service name for debug logs
const SERVICE_NAME = "AttributesService";
/* =============================================== Service ===================== */
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

	public static Increase(player: Player, key: AttributeKey, amount: number) {
		const attrs = DataService.GetProfileDataByKey(player, "Attributes");
		if (!attrs) return;
		const newValue = clampAttr(key, attrs[key] + amount);
		const delta = newValue - attrs[key];
		if (delta === 0) return;
		attrs[key] = newValue;
		attrs.SpentPoints += delta;
		attrs.AvailablePoints = math.max(attrs.AvailablePoints - delta, 0);
		ResourcesService.Recalculate(player);
	}

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
