import Fusion, { Observer, Value } from "@rbxts/fusion";
import { AbilityKey } from "shared/definitions";
import { ResourceKey } from "shared/definitions/Resources";
import { GetPlayerAbilities } from "client/network/CallServer";
import { StatusEffect } from "shared/definitions/StatusEffect";

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
	PlayerAbilities: Value<AbilityKey[]> = Value(["melee"]);
	PlayerStatusEffects: Value<StatusEffect[]> = Value([]);
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
		this.debugObserverInit();
	}

	private debugObserverInit() {
		const instance = PlayerState.getInstance();
		Observer(instance.PlayerResources.Health.Current).onChange(() => {
			print(`Player health changed: ${instance.PlayerResources.Health.Current.get()}`);
		});
		Observer(instance.PlayerResources.Mana.Current).onChange(() => {
			print(`Player mana changed: ${instance.PlayerResources.Mana.Current.get()}`);
		});
		Observer(instance.PlayerResources.Stamina.Current).onChange(() => {
			print(`Player stamina changed: ${instance.PlayerResources.Stamina.Current.get()}`);
		});
	}

	public static getInstance(): PlayerState {
		if (!PlayerState.instance) {
			PlayerState.instance = new PlayerState();
		}
		return PlayerState.instance;
	}
}
