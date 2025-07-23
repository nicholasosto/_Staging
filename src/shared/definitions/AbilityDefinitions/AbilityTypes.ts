/// <reference types="@rbxts/types" />

/**
 * @file        src/shared/definitions/AbilityDefinitions/AbilityTypes.ts
 * @module      AbilityTypes
 * @layer       Shared
 * @author      Trembus
 * @description Canonical list of abilities, casting context, and type definitions for abilities in the game.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @since        0.1.0
 * @lastUpdated  2025-06-24 by Trembus
 */

import { SSEntity } from "shared/types/SSEntity";

// Ability Keys
export const ABILITY_KEYS = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"] as const;

// Key Type
export type AbilityKey = (typeof ABILITY_KEYS)[number];

// Ability Key Type Guard
export function isAbilityKey(key: string): key is AbilityKey {
	return ABILITY_KEYS.includes(key as AbilityKey);
}

// Cast Context
export type AbilityCastContext = {
	caster: SSEntity;
	startPosition: Vector3; // Starting position of the ability cast
	target?: SSEntity | undefined; // Target entity, if applicable
};
