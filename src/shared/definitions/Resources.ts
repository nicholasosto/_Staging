/// <reference types="@rbxts/types" />

/**
 * @file        ResourceData.ts
 * @module      ResourceData
 * @author      Trembus
 * @layer       Constants
 * @description Canonical list of character Resources, their metadata,
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-10 by Trembus
 */

import { GameImages, LavaGradient, OceanGradient, ShadowGradient } from "shared/assets";

// Resource Keys
export const RESOURCE_KEYS = ["Health", "Mana", "Stamina"] as const;

// Resource Types
export type ResourceKey = (typeof RESOURCE_KEYS)[number];

// Resource Metadata Interface
export interface ResourceMeta {
	displayName: string;
	iconId: string; // Asset ID for the resource icon
	gradient: UIGradient; // Color for the resource bar
}

// Resource Metadata Records
export const ResourceMeta: Record<ResourceKey, ResourceMeta> = {
	Health: {
		displayName: "Health",
		iconId: GameImages.Attributes.Vitality, // Use the Vitality icon for Health
		gradient: LavaGradient(), // Use the LavaGradient for Health
	},
	Mana: {
		displayName: "Mana",
		iconId: GameImages.Attributes.Intelligence, // Use the Intelligence icon for Mana
		gradient: OceanGradient(),
	},
	Stamina: {
		displayName: "Stamina",
		iconId: GameImages.Attributes.Dexterity, // Use the Dexterity icon for Stamina
		gradient: ShadowGradient(),
	},
} satisfies Record<ResourceKey, ResourceMeta>;
