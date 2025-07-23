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
import { AnimationKey, playAnimation } from "shared/definitions/Animation";
import { SSEntity } from "shared/types/SSEntity";
import { CreateProjectile, ProjectileKeys } from "../Projectile";
import { Workspace } from "@rbxts/services";
import { VFXKey, VisualEffectMetaMap } from "../VisualEffect";

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

export const AbilitiesMeta = {
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
			playAnimation(caster, AbilitiesMeta.fireball.animationKey, AbilitiesMeta.fireball.duration);

			VisualEffectMetaMap.FireAura.run(caster, 5); // Run the FireAura effect for 5 seconds
			print(
				`OnStart: ${AbilitiesMeta.fireball.displayName} cast by ${caster.GetFullName()} at position ${startPosition}`,
			);
			// Additional logic for starting the fireball cast can be added here
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
		onStart: ({ caster, startPosition }) => {
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
		onStart: ({ caster, startPosition }) => {
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
		onStart: ({ caster, startPosition }) => {
			const projectile = CreateProjectile("IceShard", startPosition);
			if (!projectile) {
				print(`Failed to create IceShard projectile at ${startPosition}`);
				return;
			}
			projectile.Parent = Workspace;
			print(`IceShard cast started by ${caster.GetFullName()} at position ${startPosition}`);
			// Additional logic for starting the IceShard cast can be added here
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
		onStart: ({ caster, startPosition }) => {
			print(`Melee attack started by ${caster.GetFullName()} at position ${startPosition}`);
			playAnimation(caster, AbilitiesMeta.melee.animationKey, AbilitiesMeta.melee.duration);
			// Additional logic for starting the melee attack can be added here
		},
	},
} as const satisfies Record<AbilityKey, AbilityMeta>;

export const DefaultAbilities = ["fireball", "ice_shard", "lightning_bolt", "earthquake", "melee"] as AbilityKey[];
