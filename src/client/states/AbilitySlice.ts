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
 *
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import { Value } from "@rbxts/fusion";
import { AbilityKey } from "shared/definitions";

export default class AbilitySlice {
	private static instance: AbilitySlice;

	/** Reactive list of equipped abilities */
	public readonly Abilities = Value<AbilityKey[]>([]);

	private constructor() {
		print("AbilitySlice initialized");
	}

	public static getInstance(): AbilitySlice {
		if (this.instance === undefined) {
			this.instance = new AbilitySlice();
		}
		return this.instance;
	}

	/** Replace the ability list and notify the server */
	public UpdateAbilities(list: AbilityKey[]) {
		this.Abilities.set(list);
	}
}
