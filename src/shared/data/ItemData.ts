/// <reference types="@rbxts/types" />

/**
 * @file        ItemData.ts
 * @module      ItemData
 * @layer       Shared/Data
 * @description Item data transfer object definitions.
 */

import { AttributeMeta } from "./AttributeData";
import { BaseGemDTO } from "./GemData";

export interface ItemDTO {
	Id: string; // UUID from HttpService
	ItemId: string; // Static ID (e.g. "Gem_Fire_I")
	Qty: number;
	Rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
	Meta?: AttributeMeta | BaseGemDTO; // Socket info, stat rolls, etc.
}
