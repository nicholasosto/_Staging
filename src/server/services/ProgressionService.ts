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
import { DataProfileController } from "./DataService";
import { SendProgressionUpdated } from "server/network/ServerNetwork";

/* =============================================== Service ================================== */
export class ProgressionService {
        private static _instance: ProgressionService | undefined;

        private constructor() {
                print("ProgressionService initialized.");
        }

        public static Start(): ProgressionService {
                if (!this._instance) {
                        this._instance = new ProgressionService();
                }
                return this._instance;
        }

        /* ------------------------------- Public API ---------------------------------------- */
        public static AddExperience(player: Player, amount: number) {
                const profile = DataProfileController.GetProfile(player);
                if (!profile) return;

                const progression = profile.Data.Progression;
                progression.Experience += amount;
                while (progression.Experience >= progression.NextLevelExperience) {
                        progression.Experience -= progression.NextLevelExperience;
                        progression.Level += 1;
                        progression.NextLevelExperience = getNextLevelExperience(progression.Level);
                }
                SendProgressionUpdated(player);
        }

        public static Get(player: Player) {
                return DataProfileController.GetProfile(player)?.Data.Progression;
        }
}

// Auto-start on import
ProgressionService.Start();
