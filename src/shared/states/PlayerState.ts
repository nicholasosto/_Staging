import Fusion, { Value } from "@rbxts/fusion";

/**
 * @file        src/shared/states/PlayerState.ts
 * @module      PlayerState
 * @layer       Shared
 * @description Defines the player's health, mana, and stamina states.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

export type ResourceState = {
	Current: Value<number>;
	Max: Value<number>;
};

export const ResourceKeys = ["Health", "Mana", "Stamina"] as const;
export type ResourceKey = (typeof ResourceKeys)[number];

export const PlayerResources: Record<ResourceKey, ResourceState> = {
	Health: {
		Current: Fusion.Value<number>(100),
		Max: Fusion.Value<number>(100),
	},
	Mana: {
		Current: Fusion.Value<number>(100),
		Max: Fusion.Value<number>(100),
	},
	Stamina: {
		Current: Fusion.Value<number>(100),
		Max: Fusion.Value<number>(100),
	},
};
