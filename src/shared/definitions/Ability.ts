/// <reference types="@rbxts/types" />

/**
 * @file        AbilityData.ts
 * @module      AbilityDefinitions
 * @author      Trembus
 * @layer       Constants
 * @description Canonical list of abilities, their metadata, and strongly-typed helpers for default values & validation.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-24 by Trembus
 */

import { GameImages } from "shared/assets";

// Ability Keys
export const ABILITY_KEYS = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"] as const;

// Key Type
export type AbilityKey = (typeof ABILITY_KEYS)[number];

// Ability Metadata Interface
export interface AbilityMeta {
	displayName: string;
	iconId: string;
	animationId: string; // Animation ID for the ability
	description: string;
	cooldown: number; // Cooldown in seconds
	basePower: number; // Base power of the ability
}

export const AbilitiesMeta: Record<AbilityKey, AbilityMeta> = {
	fireball: {
		displayName: "Fireball",
		iconId: GameImages.Ability.Flame_Sythe,
		animationId: "rbxassetid://0987654321", // Replace with actual animation ID
		description: "Launches a fiery projectile that explodes on impact.",
		cooldown: 5,
		basePower: 50,
	},
	ice_shard: {
		displayName: "Ice Shard",
		iconId: GameImages.Ability.Ice_Shard,
		animationId: "rbxassetid://77085115837905", // Replace with actual animation ID
		description: "Launches a shard of ice that pierces through enemies.",
		cooldown: 6,
		basePower: 40,
	},
	lightning_bolt: {
		displayName: "Lightning Bolt",
		iconId: GameImages.Ability.Lightning_Bolt,
		animationId: "rbxassetid://0987654323", // Replace with actual animation ID
		description: "Calls down a bolt of lightning to strike enemies.",
		cooldown: 7,
		basePower: 60,
	},
	earthquake: {
		displayName: "Earthquake",
		iconId: GameImages.Ability.Earthquake,
		animationId: "rbxassetid://0987654324", // Replace with actual animation ID
		description: "Causes the ground to shake, damaging all nearby enemies.",
		cooldown: 10,
		basePower: 80,
	},
	melee: {
		displayName: "Melee Attack",
		iconId: GameImages.Ability.Melee,
		animationId: "rbxassetid://0987654325", // Replace with actual animation ID
		description: "A basic melee attack that deals physical damage.",
		cooldown: 2,
		basePower: 30,
	},
} satisfies Record<AbilityKey, AbilityMeta>;

export const DefaultAbilities: Record<AbilityKey, number> = {
	fireball: 0,
	ice_shard: 0,
	lightning_bolt: 0,
	earthquake: 0,
	melee: 0,
};
