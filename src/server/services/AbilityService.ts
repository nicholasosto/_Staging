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
import { ResourcesService } from "./ResourcesService";

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
	/* ------------------------------- Mutator Methods ------------------------------- */
	public static SetAbilities(player: Player, abilities: AbilityKey[]) {
		const profile = DataProfileController.GetProfile(player);
		if (!profile) {
			warn(`No profile found for player ${player.Name}.`);
			return;
		}
		profile.Data.Abilities = abilities;
	}

	/* ------------------------------- Ability Management ------------------------------- */
	public static AddAbility(player: Player, abilityKey: AbilityKey) {
		const profile = DataProfileController.GetProfile(player);
		if (!profile) {
			warn(`No profile found for player ${player.Name}.`);
			return;
		}
		if (!profile.Data.Abilities.includes(abilityKey)) {
			profile.Data.Abilities.push(abilityKey);
			print(`Added ability ${abilityKey} to player ${player.Name}.`);
		} else {
			warn(`Player ${player.Name} already has ability ${abilityKey}.`);
		}
	}

	/* ------------------------------- Ability Removal ------------------------------- */
	public static RemoveAbility(player: Player, abilityKey: AbilityKey) {
		const profile = DataProfileController.GetProfile(player);
		if (!profile) {
			warn(`No profile found for player ${player.Name}.`);
			return;
		}
		const abilities = profile.Data.Abilities;
		const index = abilities.indexOf(abilityKey);
		const removed = abilities.remove(index);
		if (removed) {
			print(`Removed ability ${abilityKey} from player ${player.Name}.`);
		} else {
			warn(`Player ${player.Name} does not have ability ${abilityKey}.`);
		}
	}

	/* ------------------------------- Ability Retrieval ------------------------------- */
	public static GetAbilities(player: Player): AbilityKey[] | undefined {
		const profile = DataProfileController.GetProfile(player);
		return profile?.Data.Abilities;
	}

	/* ------------------------------- Ability Activation ------------------------------ */
	public static Activate(player: Player, abilityKey: AbilityKey): boolean {
		const svc = this.Start();
		const abilities = this.GetAbilities(player);
		// Check if the player has the ability
		if (!abilities || !abilities.includes(abilityKey)) {
			warn(`Player ${player.Name} does not have ability ${abilityKey}.`);
			return false;
		}

		// Get or create the cooldown map for the player
		let playerCooldowns = svc._cooldowns.get(player);
		if (!playerCooldowns) {
			playerCooldowns = new Map<AbilityKey, CooldownTimer>();
			svc._cooldowns.set(player, playerCooldowns);
		}

		// Check if the ability is already on cooldown
		const existing = playerCooldowns.get(abilityKey);
		if (existing && !existing.isReady()) {
			warn(`Ability ${abilityKey} on cooldown for player ${player.Name}.`);
			return false;
		}

		// Validate and consume resources
		if (!svc.validateAndConsumeResources(player, abilityKey)) {
			warn(`Player ${player.Name} does not have enough resources to activate ${abilityKey}.`);
			return false;
		}

		// If the ability is not on cooldown, start a new cooldown timer
		const cooldown = AbilitiesMeta[abilityKey]?.cooldown ?? 0;
		const timer = new CooldownTimer(cooldown);
		playerCooldowns.set(abilityKey, timer);
		timer.start();

		const character = player.Character || player.CharacterAdded.Wait()[0];
		loadAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		playAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		print(`Activated ability ${abilityKey} for player ${player.Name}.`);

		return true;
	}

	private validateAndConsumeResources(player: Player, abilityKey: AbilityKey): boolean {
		const manaCost = AbilitiesMeta[abilityKey]?.cost.mana ?? 0;
		const staminaCost = AbilitiesMeta[abilityKey]?.cost.stamina ?? 0;
		const resources = ResourcesService.GetResources(player);
		const ConsumeMana = ResourcesService.ModifyResource(player, "Mana", -manaCost);
		const ConsumeStamina = ResourcesService.ModifyResource(player, "Stamina", -staminaCost);
		if (!ConsumeMana || !ConsumeStamina) {
			warn(`Player ${player.Name} does not have enough resources to activate ${abilityKey}.`);
			return false;
		}
		return true;
	}
}