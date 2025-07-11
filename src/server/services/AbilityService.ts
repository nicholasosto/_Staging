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
import { DataService } from "./DataService";
import { CooldownTimer } from "shared/classes/CooldownTimer";
import { ResourcesService } from "./ResourcesService";
import { BeamCatalog } from "shared/definitions/Beams";
import { BeamFactory } from "shared/facory";
import { SSEntityHelper } from "shared/helpers/SSEntityHelpers";
import { SSEntity } from "shared/types/SSEntity";

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
		const profile = DataService.GetProfile(player);
		if (!profile) {
			warn(`No profile found for player ${player.Name}.`);
			return;
		}
		profile.Data.Abilities = abilities;
	}

	/* ------------------------------- Ability Management ------------------------------- */
	public static AddAbility(player: Player, abilityKey: AbilityKey) {
		const profile = DataService.GetProfile(player);
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
		const profile = DataService.GetProfile(player);
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
		const profile = DataService.GetProfile(player);
		return profile?.Data.Abilities;
	}

	/* ------------------------------- Validation ------------------------------------- */
	private static _playerHasAbility(player: Player, abilityKey: AbilityKey): boolean {
		const abilities = this.GetAbilities(player);
		if (abilities?.size() === 0 || abilities === undefined) {
			warn(`Player ${player.Name} has no abilities defined.`);
			return false;
		}
		return abilities ? abilities.includes(abilityKey) : false;
	}

	private static _validateCooldown(player: Player, abilityKey: AbilityKey): boolean {
		// Get or create the cooldown map for the player
		let playerCooldowns = this._instance?._cooldowns.get(player);
		if (!playerCooldowns) {
			playerCooldowns = new Map<AbilityKey, CooldownTimer>();
			this._instance?._cooldowns.set(player, playerCooldowns);
		}
		// Check if the ability is already on cooldown
		if (playerCooldowns === undefined) {
			warn(`No cooldowns found for player ${player.Name}.`);
			return false;
		}

		const existing = playerCooldowns.get(abilityKey);
		if (existing && !existing.isReady()) {
			warn(`Ability ${abilityKey} is already on cooldown for player ${player.Name}`);
			return false;
		}
		return true;
	}

	private static _validateResources(player: Player, abilityKey: AbilityKey): boolean {
		// Get the required resources for the ability
		const manaCost = AbilitiesMeta[abilityKey]?.cost.mana ?? 0;
		const staminaCost = AbilitiesMeta[abilityKey]?.cost.stamina ?? 0;

		// Validate if the player has enough resources
		const validateMana = ResourcesService.ValidateResourceModification(player, "Mana", -manaCost);
		const validateStamina = ResourcesService.ValidateResourceModification(player, "Stamina", -staminaCost);
		if (!validateMana || !validateStamina) {
			warn(`Player ${player.Name} does not have enough resources to activate ${abilityKey}.`);
			return false;
		}
		return true;
	}

	/* ------------------------------- Cooldown Management ------------------------------- */
	private static _startCooldown(player: Player, abilityKey: AbilityKey): void {
		// Get or create the cooldown map for the player
		let playerCooldowns = this._instance?._cooldowns.get(player);
		if (!playerCooldowns) {
			warn(
				`No cooldowns found for player ${player.Name}. Creating a new cooldown map.`,
				"Check Validation - This should not happen.",
			);
			playerCooldowns = new Map<AbilityKey, CooldownTimer>();
			this._instance?._cooldowns.set(player, playerCooldowns);
		}
		const cooldown = AbilitiesMeta[abilityKey]?.cooldown ?? 0;
		const timer = new CooldownTimer(cooldown);
		playerCooldowns.set(abilityKey, timer);
		timer.start();
		print(`Started cooldown for ability ${abilityKey} for player ${player.Name}.`);
	}

	private static _consumeResources(player: Player, abilityKey: AbilityKey): void {
		/* This should never fail unless the Activate method is faulty */
		if (!this._validateResources(player, abilityKey)) {
			warn(`ERROR: Check Activate method as this should never fail.`);
			return;
		}

		/* Get the required resources for the ability */
		const manaCost = AbilitiesMeta[abilityKey]?.cost.mana ?? 0;
		const staminaCost = AbilitiesMeta[abilityKey]?.cost.stamina ?? 0;
		if (manaCost > 0) {
			ResourcesService.ModifyResource(player, "Mana", -manaCost);
		}
		if (staminaCost > 0) {
			ResourcesService.ModifyResource(player, "Stamina", -staminaCost);
		}
	}

	/* ------------------------------- Ability Activation ------------------------------ */
	public static Activate(player: Player, abilityKey: AbilityKey): boolean {
		/* Validate Ability */
		if (!this._playerHasAbility(player, abilityKey)) return false;
		/* Validate Resources and Cooldown */
		if (!this._validateResources(player, abilityKey) || !this._validateCooldown(player, abilityKey)) {
			return false;
		}
		// Start the cooldown for the ability
		this._startCooldown(player, abilityKey);
		// Consume the resources required for the ability
		this._consumeResources(player, abilityKey);

		const character = player.Character as SSEntity;
		if (character === undefined) return false;
		const characterCFrame = character.GetPivot();

		if (characterCFrame === undefined) return false;

		loadAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		playAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		print(`Activated ability ${abilityKey} for player ${player.Name}.`);

		return true;
	}
}
