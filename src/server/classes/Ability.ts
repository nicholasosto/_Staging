/// <reference types="@rbxts/types" />

/**
 * @file        Ability.ts
 * @module      Ability
 * @layer       Server/Class
 * @description Wrapper for an ability instance including its cooldown timer.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 */

import { AbilityKey, AbilityCatalog } from "shared";
import { CooldownTimer } from "shared/classes/CooldownTimer";

/** Represents a player's ability with an internal cooldown timer. */
export default class Ability {
	public readonly Key: AbilityKey;
	private readonly cooldown: CooldownTimer;

	constructor(key: AbilityKey) {
		this.Key = key;
		const meta = AbilityCatalog[key];
		this.cooldown = new CooldownTimer(meta.cooldown);
	}

	/** True when the ability can be activated. */
	public isReady(): boolean {
		return this.cooldown.isReady();
	}

	/** Begin the cooldown phase. */
	public startCooldown(): void {
		this.cooldown.start();
	}
}
