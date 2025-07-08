/// <reference types="@rbxts/types" />

/**
 * @file        PlayerState.ts
 * @module      PlayerState
 * @layer       Client/State
 * @description Lightweight wrapper exposing client state slices.
 */

/**
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added metadata header
 */

import { Value } from "@rbxts/fusion";
import AbilitySlice from "./AbilitySlice";
import ResourceSlice from "./ResourceSlice";
import AttributesSlice from "./AttributesSlice";
import ProgressionSlice from "./ProgressionSlice";
import CurrencySlice from "./CurrencySlice";
import { StatusEffect } from "shared/definitions/StatusEffect";
import { AbilityKey, ResourceDTO } from "shared";

export default class PlayerState {
	private static instance: PlayerState;

	public readonly Abilities = AbilitySlice.getInstance();
	public readonly Resources = ResourceSlice.getInstance();
	public readonly Attributes = AttributesSlice.getInstance();
	public readonly Progression = ProgressionSlice.getInstance();
	public readonly Currency = CurrencySlice.getInstance();

	/** Active status effects */
	public StatusEffects = Value<StatusEffect[]>([]);

	private constructor() {
		warn("PlayerState:", PlayerState);
	}

	public static getInstance(): PlayerState {
		if (!this.instance) {
			this.instance = new PlayerState();
		}
		return this.instance;
	}

	public static updateAbilities(abilities: AbilityKey[]): void {
		this.getInstance().Abilities.Abilities.set(abilities);
	}
	public static updateResources(resources: ResourceDTO): void {}
}
