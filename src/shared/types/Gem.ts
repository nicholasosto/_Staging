/// <reference types="@rbxts/types" />

/**
 * @file        Gem.ts
 * @module      Gem
 * @layer       Shared/Data
 * @description Type definitions for gem data.
 */

/* =============================================== Imports =============================================== */
import { HttpService } from "@rbxts/services";
import { Rarity } from "./base/Rarity";
import { Identification } from "./base";

export interface GemSaveData extends Identification {
	Rarity: Rarity; // Rarity of the gem
	Capacity: number; // Capacity of the gem
	AbilityIds?: string[]; // List of ability IDs associated with the gem
	AttributeBonuses?: Record<string, number>; // Attribute bonuses provided by the gem
}
