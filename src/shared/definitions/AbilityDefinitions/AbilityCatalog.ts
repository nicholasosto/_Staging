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
import { AbilityKey, AbilityCastContext } from "./AbilityTypes";
import { AbilityMeta } from "./AbilityShape";
import { VisualEffectMetaMap } from "../VisualEffect";

export const AbilityCatalog = {
	fireball: {
		displayName: "Fireball",
		iconId: GameImages.Ability.Flame_Sythe,
		animationKey: "HallowHold", // Replace with actual animation key
		castEffect: "FireAura", // Optional visual effect to play when casting
		description: "Launches a fiery projectile that explodes on impact.",
		duration: 2,
		cooldown: 5,
		basePower: 50,
		cost: {
			mana: 20, // Example mana cost
			stamina: 10, // Example stamina cost
		},
		onStart: (context: AbilityCastContext) => {
			const { caster, startPosition } = context;
			VisualEffectMetaMap.FireAura.run(caster, 5); // Run the FireAura effect for 5 seconds
		},
	},
	ice_shard: {
		displayName: "Ice Shard",
		iconId: GameImages.Ability.Ice_Shard,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Launches a shard of ice that pierces through enemies.",
		cooldown: 0.31,
		duration: 1.5, // Duration of the ability cast
		basePower: 40,
		cost: {
			mana: 25, // Example mana cost
			stamina: 25, // Example stamina cost
		},
		onStart: (context: AbilityCastContext) => {
			const { caster, startPosition } = context;
			print(`Ice Shard cast started by ${caster.GetFullName()} at position ${startPosition}`);
			// Additional logic for starting the ice shard cast can be added here
		},
	},
	lightning_bolt: {
		displayName: "Lightning Bolt",
		iconId: GameImages.Ability.Lightning_Bolt,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Calls down a bolt of lightning to strike enemies.",
		duration: 1.5, // Duration of the ability cast
		cooldown: 7,
		basePower: 60,
		cost: {
			mana: 25, // Example mana cost
			stamina: 15, // Example stamina cost
		},
		onStart: (context: AbilityCastContext) => {
			const { caster, startPosition } = context;
			print(`Lightning Bolt cast started by ${caster.GetFullName()} at position ${startPosition}`);
			// Additional logic for starting the lightning bolt cast can be added here
		},
	},
	earthquake: {
		displayName: "Earthquake",
		iconId: GameImages.Ability.Earthquake,
		animationKey: "HallowHold", // Replace with actual animation key
		description: "Causes the ground to shake, damaging all nearby enemies.",
		cooldown: 10,
		duration: 2, // Duration of the ability cast
		basePower: 80,
		cost: {
			mana: 30, // Example mana cost
			stamina: 20, // Example stamina cost
		},
		onStart: (context: AbilityCastContext) => {
			const { caster, startPosition } = context;
			print(`Earthquake cast started by ${caster.GetFullName()} at position ${startPosition}`);
		},
	},
	melee: {
		displayName: "Melee Attack",
		iconId: GameImages.Ability.Melee,
		animationKey: "Punch_01", // Replace with actual animation key
		description: "A basic melee attack that deals physical damage.",
		cooldown: 0.6,
		duration: 0.5, // Duration of the ability cast
		basePower: 30,
		cost: {
			mana: 0,
			stamina: 5,
		},
		onStart: (context: AbilityCastContext) => {
			const { caster, startPosition } = context;
			print(`Melee attack started by ${caster.GetFullName()} at position ${startPosition}`);
		},
	},
} as const satisfies Record<AbilityKey, AbilityMeta>;

export const DefaultAbilities = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"] as AbilityKey[];
