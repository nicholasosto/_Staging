/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionService.ts
 * @module      ProgressionService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Handles player experience and level progression.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-05 by Codex – Initial creation
 */

/* =============================================== Imports ================================== */
import { getNextLevelExperience } from "shared/definitions/ProfileDefinitions/Progression";
import { DataService } from "./DataService";

/* =============================================== Service ================================== */
export class ProgressionService {
	private static _instance: ProgressionService | undefined;

	private constructor() {
		print("ProgressionService initialized.");
	}

	public static Start(): ProgressionService {
		if (this._instance === undefined) {
			this._instance = new ProgressionService();
		}
		return this._instance;
	}

	/* ------------------------------- Public API ---------------------------------------- */
	public static AddExperience(player: Player, amount: number): boolean {
		const progressionData = DataService.GetProfileDataByKey(player, "Progression");
		if (!progressionData) return false;

		/* Update experience and level */
		progressionData.Experience += amount;
		while (progressionData.Experience >= progressionData.NextLevelExperience) {
			progressionData.Experience -= progressionData.NextLevelExperience;
			this._levelUp(player);
		}
		DataService.SetProfileDataByKey(player, "Progression", progressionData);
		return true;
	}
	private static _levelUp(player: Player): boolean {
		const progressionData = DataService.GetProfileDataByKey(player, "Progression");
		if (!progressionData) return false;

		progressionData.Level += 1;
		progressionData.NextLevelExperience = getNextLevelExperience(progressionData.Level);
		DataService.SetProfileDataByKey(player, "Progression", progressionData);
		return true;
	}

	/** Get the progression data for a player */
	public static GetProgressionData(player: Player) {
		return DataService.GetProfileDataByKey(player, "Progression");
	}
}

// Auto-start on import
ProgressionService.Start();
