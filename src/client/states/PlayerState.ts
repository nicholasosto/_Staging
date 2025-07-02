import Fusion, { Value } from "@rbxts/fusion";
import { AbilityKey } from "shared/definitions";
import { ResourceKey } from "shared/definitions/Resources";
import { GetPlayerAbilities } from "client/network/CallServer";

/**
 * @file        src/client/states/PlayerState.ts
 * @module      PlayerState
 * @layer       Client
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

export default class PlayerState {
	private static instance: PlayerState;
	PlayerAbilities: AbilityKey[] = [];
	PlayerResources: Record<ResourceKey, ResourceState> = {
		Health: {
			Current: Value(100),
			Max: Value(100),
		},
		Mana: {
			Current: Value(100),
			Max: Value(100),
		},
		Stamina: {
			Current: Value(100),
			Max: Value(100),
		},
	};

	private constructor() {
		// Initialize player state
		PlayerState.instance = this;
		this.getPlayerAbilities();
	}

	private getPlayerAbilities() {
		print("Fetching player abilities...");
		GetPlayerAbilities().then((abilities) => {
			if (abilities) {
				this.PlayerAbilities = abilities;
			} else {
				warn("Failed to fetch player abilities.");
			}
		});
	}

	public static getInstance(): PlayerState {
		if (!PlayerState.instance) {
			PlayerState.instance = new PlayerState();
		}
		return PlayerState.instance;
	}
}
