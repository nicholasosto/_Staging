/// <reference types="@rbxts/types" />

/**
 * @file        AbilityService.ts
 * @module      AbilityService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Manages player abilities and activation cooldowns.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-03 by Codex – Initial creation
 */

/* =============================================== Imports =============================================== */
import { AbilitiesMeta, AbilityKey, loadAnimation, playAnimation } from "shared";
import { DataProfileController } from "./DataService";
import { CooldownTimer } from "shared/classes/CooldownTimer";

/* =============================================== Service =============================================== */
export class AbilityService {
	private static _instance: AbilityService | undefined;
	private readonly _cooldowns = new Map<Player, Map<AbilityKey, CooldownTimer>>();

	private constructor() {
		print("AbilityService initialized.");
	}

	public static Start(): AbilityService {
		if (!this._instance) {
			this._instance = new AbilityService();
		}
		return this._instance;
	}

	/* ------------------------------- Ability Retrieval ------------------------------- */
	public static GetAbilities(player: Player): AbilityKey[] | undefined {
		const profile = DataProfileController.GetProfile(player);
		return profile?.Data.Abilities;
	}

	/* ------------------------------- Ability Activation ------------------------------ */
	public static Activate(player: Player, abilityKey: AbilityKey) {
		const svc = this.Start();
		const abilities = this.GetAbilities(player);
		if (!abilities || !abilities.includes(abilityKey)) {
			warn(`Player ${player.Name} does not have ability ${abilityKey}.`);
			return;
		}

		let playerCooldowns = svc._cooldowns.get(player);
		if (!playerCooldowns) {
			playerCooldowns = new Map<AbilityKey, CooldownTimer>();
			svc._cooldowns.set(player, playerCooldowns);
		}

		const existing = playerCooldowns.get(abilityKey);
		if (existing && !existing.isReady()) {
			warn(`Ability ${abilityKey} on cooldown for player ${player.Name}.`);
			return;
		}

		const cooldown = AbilitiesMeta[abilityKey]?.cooldown ?? 0;
		const timer = new CooldownTimer(cooldown);
		playerCooldowns.set(abilityKey, timer);
		timer.start();

		const character = player.Character || player.CharacterAdded.Wait()[0];
		loadAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		playAnimation(character, AbilitiesMeta[abilityKey].animationKey);
	}
}

// Auto-start on import
AbilityService.Start();
