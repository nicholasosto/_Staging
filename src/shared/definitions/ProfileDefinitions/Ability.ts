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
import { AnimationKey } from "shared/definitions/Animation";

// Ability Keys
export const ABILITY_KEYS = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"] as const;

// Key Type
export type AbilityKey = (typeof ABILITY_KEYS)[number];

// Ability Key Type Guard
export function isAbilityKey(key: string): key is AbilityKey {
	return ABILITY_KEYS.includes(key as AbilityKey);
}

// Ability Metadata Interface
export interface AbilityMeta {
	displayName: string;
	iconId: string;
	animationKey: AnimationKey; // Animation ID for the ability
	description: string;
	cooldown: number; // Cooldown in seconds
	basePower: number; // Base power of the ability
	cost: {
		mana: number; // Mana cost for the ability
		stamina: number; // Stamina cost for the ability
	};
}

export const AbilitiesMeta = {
	fireball: {
		displayName: "Fireball",
		iconId: GameImages.Ability.Flame_Sythe,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Launches a fiery projectile that explodes on impact.",
		cooldown: 5,
		basePower: 50,
		cost: {
			mana: 20, // Example mana cost
			stamina: 10, // Example stamina cost
		},
	},
	ice_shard: {
		displayName: "Ice Shard",
		iconId: GameImages.Ability.Ice_Shard,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Launches a shard of ice that pierces through enemies.",
		cooldown: 6,
		basePower: 40,
		cost: {
			mana: 15, // Example mana cost
			stamina: 5, // Example stamina cost
		},
	},
	lightning_bolt: {
		displayName: "Lightning Bolt",
		iconId: GameImages.Ability.Lightning_Bolt,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Calls down a bolt of lightning to strike enemies.",
		cooldown: 7,
		basePower: 60,
		cost: {
			mana: 25, // Example mana cost
			stamina: 15, // Example stamina cost
		},
	},
	earthquake: {
		displayName: "Earthquake",
		iconId: GameImages.Ability.Earthquake,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Causes the ground to shake, damaging all nearby enemies.",
		cooldown: 10,
		basePower: 80,
		cost: {
			mana: 30, // Example mana cost
			stamina: 20, // Example stamina cost
		},
	},
	melee: {
		displayName: "Melee Attack",
		iconId: GameImages.Ability.Melee,
		animationKey: "Punch_01", // Replace with actual animation key
		description: "A basic melee attack that deals physical damage.",
		cooldown: 2,
		basePower: 30,
		cost: {
			mana: 0,
			stamina: 5,
		},
	},
} as const satisfies Record<AbilityKey, AbilityMeta>;

export const DefaultAbilities = ABILITY_KEYS.reduce<Record<AbilityKey, number>>(
	(obj, key) => {
		obj[key] = 0;
		return obj;
	},
	{} as Record<AbilityKey, number>,
);
