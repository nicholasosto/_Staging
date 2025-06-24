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
import { RarityKey } from "./RarityData";
import { AttributesMap } from "./AttributeData";
// shared/Enums/GemSubtype.ts
export type GemSubtype = "Form" | "Ability" | "Bonus" | "Manifestation";

// shared/DTO/BaseGemDTO.ts
export interface BaseGemDTO {
	Uuid: string; // HttpService.GenerateGUID
	Rarity: RarityKey; // Common … Legendary
	Subtype: GemSubtype;
	Name: string; // Generated “Radiant Opal Shard”
}

/* 3 specialised leaf DTOs ---------------------------------------- */
export interface FormGemDTO extends BaseGemDTO {
	Subtype: "Form";
	HumanoidDescriptionJson: string; // serialised HumanoidDescription
}

export interface AbilityGemDTO extends BaseGemDTO {
	Subtype: "Ability";
	AbilityId: string; // e.g. "FireBreath"
	PowerScale: number; // scaler 0–1 based on rarity roll
}

export interface BonusGemDTO extends BaseGemDTO {
	Subtype: "Bonus";
	Stats: {
		Attack: number;
		Health: number;
		PhysDef: number;
		MagDef: number;
	};
}

/* The crafted result --------------------------------------------- */
export interface ManifestationGemDTO extends BaseGemDTO {
	Subtype: "Manifestation";
	FormGemUuid: string;
	AbilityGemUuid: string;
	BonusGemUuid: string;
}
