/// <reference types="@rbxts/types" />

/**
 * @file        AbilitySlice.ts
 * @module      AbilitySlice
 * @layer       Client/State
 * @description Reactive container tracking the player's equipped abilities.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { Value } from "@rbxts/fusion";
import { AbilityKey } from "shared/definitions";
import { GetAbilities, SetAbilities, CastAbility } from "client/network/ClientNetworkService";

export default class AbilitySlice {
	private static instance: AbilitySlice;

	/** Reactive list of equipped abilities */
	public readonly Abilities = Value<AbilityKey[]>([]);

	private constructor() {
		this.fetchFromServer();
	}

	private async fetchFromServer() {
		const data = await GetAbilities();
		if (data) {
			this.Abilities.set(data);
		}
	}

	public static getInstance(): AbilitySlice {
		if (!this.instance) {
			this.instance = new AbilitySlice();
		}
		return this.instance;
	}

	/** Replace the ability list and notify the server */
	public setAbilities(list: AbilityKey[]) {
		this.Abilities.set(list);
		SetAbilities(list);
	}

	/** Trigger an ability cast request on the server */
	public useAbility(key: AbilityKey) {
		CastAbility(key);
	}
}
