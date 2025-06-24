/// <reference types="@rbxts/types" />

/**
 * @file        Gem.ts
 * @module      Gem
 * @layer       Shared/Data
 * @description Type definitions for gem data.
 */

/* =============================================== Imports =============================================== */
// External Imports
import { HttpService } from "@rbxts/services";
// Custom Imports
import { RarityKey } from "./Rarity";
import { AttributesMap } from "./AttributeData";
import { Identification } from "shared/types";

// Metadata for gem abilities
export interface GemMetadata {
	Idendification: Identification;
	Rarity: RarityKey;
	attributes: AttributesMap;
	abilities: string[]; // List of ability names
}
