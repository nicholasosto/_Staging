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
	layoutOrder: number; // Optional layout order for UI elements
}

// Resource Metadata Records
export const ResourceMeta: Record<ResourceKey, ResourceMeta> = {
	Health: {
		displayName: "Health",
		iconId: GameImages.Attributes.Vitality, // Use the Vitality icon for Health
		gradient: LavaGradient(), // Use the LavaGradient for Health
		layoutOrder: 1,
	},
	Mana: {
		displayName: "Mana",
		iconId: GameImages.Attributes.Intelligence, // Use the Intelligence icon for Mana
		gradient: OceanGradient(),
		layoutOrder: 2,
	},
	Stamina: {
		displayName: "Stamina",
		iconId: GameImages.Attributes.Dexterity, // Use the Dexterity icon for Stamina
		gradient: ShadowGradient(),
		layoutOrder: 3,
	},
} satisfies Record<ResourceKey, ResourceMeta>;

export interface ResourceDTO {
	current: number;
	max: number;
	// optional fields
	regenPerSecond?: number;
	// timestamp for last regen tick, status flags, etc.
}

export const DEFAULT_RESOURCES: Record<ResourceKey, ResourceDTO> = {
	Health: { current: 100, max: 100 },
	Mana: { current: 50, max: 50, regenPerSecond: 5 },
	Stamina: { current: 75, max: 75, regenPerSecond: 10 },
} as const;

/** Type-safe lookup: returns meta & dto bundled for convenience */
export function getResourceBundle(key: ResourceKey) {
	return {
		key,
		meta: ResourceMeta[key],
		data: DEFAULT_RESOURCES[key],
	};
}
