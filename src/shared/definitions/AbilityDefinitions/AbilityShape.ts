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

import { AbilityCastContext } from "./AbilityTypes";
import { AnimationKey } from "shared/definitions/Animation";
import { VFXKey } from "../VisualEffect";

// Ability Metadata Interface
export interface AbilityMeta {
	displayName: string;
	iconId: string;
	animationKey: AnimationKey; // Animation ID for the ability
	castEffect?: VFXKey; // Optional visual effect to play when casting
	description: string;
	cooldown: number; // Cooldown in seconds
	duration: number; // Duration of the ability time to use (prevents overlapping ability casts)
	basePower: number; // Base power of the ability
	cost: {
		mana: number; // Mana cost for the ability
		stamina: number; // Stamina cost for the ability
	};
	onStart: (context: AbilityCastContext) => void; // Optional start function for initialization
	onTick?: (context: AbilityCastContext, deltaTime: number) => void; // Optional tick function for continuous effects
	onEnd?: (context: AbilityCastContext) => void; // Optional end function for cleanup
}
