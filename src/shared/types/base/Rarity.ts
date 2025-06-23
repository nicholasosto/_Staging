/// <reference types="@rbxts/types" />

/**
 * @file        rarity.ts
 * @module      Rarity
 * @layer       Shared/Data
 * @description Enum types for gem rarity levels.
 */

export const RarityKeys = ["Common", "Uncommon", "Rare", "Epic", "Legendary"] as const;

export type Rarity = (typeof RarityKeys)[number];

export interface RarityMeta {
	displayName: string;
	color: Color3;
	BorderImage: string; // Asset ID for the rarity icon
}
