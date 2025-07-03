/**
 * @file Effects.ts
 * @module EffectsDefinitions
 * @layer Shared/Definitions
 * @description Enumerates effects and their metadata.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author Trembus
 * @license MIT
 * @since 0.2.0
 * @lastUpdated 2025-07-03 by Trembus – Initial creation
 *
 */

export const EFFECT_TYPE_KEYS = ["ResourceHazard", "ResourceRestoration", "SpeedBoost", "DamageBoost"] as const;
export type EffectTypeKey = (typeof EFFECT_TYPE_KEYS)[number];

export interface EffectMeta {
	displayName: string;
	iconId: string;
	description: string;
	tickRate: number; // How often the effect applies its logic
	amount: number; // Amount of effect applied
}

export const EffectMeta: Record<EffectTypeKey, EffectMeta> = {
	ResourceHazard: {
		displayName: "Resource Hazard",
		iconId: "rbxassetid://12345678", // Placeholder ID
		description: "Applies a hazard effect that drains resources over time.",
		tickRate: 1,
		amount: -5,
	},
	ResourceRestoration: {
		displayName: "Resource Restoration",
		iconId: "rbxassetid://23456789", // Placeholder ID
		description: "Restores resources over time.",
		tickRate: 1,
		amount: 5,
	},
	SpeedBoost: {
		displayName: "Speed Boost",
		iconId: "rbxassetid://34567890", // Placeholder ID
		description: "Increases movement speed temporarily.",
		tickRate: 0.5,
		amount: 10,
	},
	DamageBoost: {
		displayName: "Damage Boost",
		iconId: "rbxassetid://45678901", // Placeholder ID
		description: "Increases damage dealt temporarily.",
		tickRate: 0.5,
		amount: 10,
	},
} as const satisfies Record<EffectTypeKey, EffectMeta>;
