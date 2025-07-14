/// <reference types="@rbxts/types" />

/**
 * ### AbilityService
 * Server-side service for managing player abilities and cooldowns.
 *
 * @module     Server/Services/AbilityService
 * @owner      Trembus
 * @since      0.2.0
 * @lastUpdate 2025-07-12
 *
 * @remarks
 * Manages abilities via DataService, handles cooldowns, and resource validation.
 */

/* =============================================== Imports =============================================== */
import { AbilitiesMeta, AbilityKey, loadAnimation, playAnimation } from "shared";
import { DataService } from "./DataService";
import { CooldownTimer } from "shared/classes/CooldownTimer";
import { ResourcesService } from "./ResourcesService";
import { SSEntity } from "shared/types/SSEntity";
import { RunService } from "@rbxts/services";
import { ServerSend } from "server/network";
import MessageService from "./MessageService";
import { createMessage } from "shared/definitions/Message";

/* =============================================== Service =============================================== */
export default class AbilityService {
	private static _instance: AbilityService | undefined;
	private readonly _cooldowns = new Map<Player, Map<AbilityKey, CooldownTimer>>();

	private constructor() {
		if (RunService.IsStudio()) print(`AbilityService started`);
	}

	public static Start(): AbilityService {
		if (!this._instance) {
			this._instance = new AbilityService();
		}
		return this._instance;
	}
	/**
	 * Shutdown and cleanup the service.
	 */
	public static Destroy(): void {
		this._instance?.destroyInternal();
		this._instance = undefined;
	}

	/* ------------------------------- Mutator Methods ------------------------------- */
	public static SetAbilities(player: Player, abilities: AbilityKey[]): boolean {
		const currentAbilities = DataService.GetProfileDataByKey(player, "Abilities");
		//#TODO: Replace with full validation
		if (!currentAbilities) {
			warn(`No profile found for player ${player.Name}.`);
			return false;
		}
		if (DataService.SetProfileDataByKey(player, "Abilities", abilities) === undefined) {
			return true;
		} else {
			warn(`Failed to set abilities for player ${player.Name}.`);
			return false;
		}
	}

	/* ------------------------------- Ability Management ------------------------------- */
	public static AddAbility(player: Player, abilityKey: AbilityKey): boolean {
		const currentAbilities = this.GetAbilities(player);
		if (!currentAbilities) {
			warn(`No abilities found for player ${player.Name}.`);
			return false;
		}
		if (!currentAbilities.includes(abilityKey)) {
			currentAbilities.push(abilityKey);
			this.SetAbilities(player, currentAbilities);
			print(`Added ability ${abilityKey} to player ${player.Name}.`);
		}
		return true;
	}

	/* ------------------------------- Ability Removal ------------------------------- */
	public static RemoveAbility(player: Player, abilityKey: AbilityKey): boolean {
		const currentAbilities = this.GetAbilities(player);
		if (!currentAbilities) {
			warn(`No abilities found for player ${player.Name}.`);
			return false;
		}
		if (currentAbilities.includes(abilityKey)) {
			const updatedAbilities = currentAbilities.filter((ability) => ability !== abilityKey);
			this.SetAbilities(player, updatedAbilities);
			print(`Removed ability ${abilityKey} from player ${player.Name}.`);
			return true;
		} else {
			warn(`Player ${player.Name} does not have ability ${abilityKey}.`);
		}

		return false;
	}

	/* ------------------------------- Ability Retrieval ------------------------------- */
	public static GetAbilities(player: Player): AbilityKey[] | undefined {
		return DataService.GetProfileDataByKey(player, "Abilities");
	}

	public static SetAbilitiesForPlayer(player: Player, abilities: AbilityKey[]): boolean {
		const profile = DataService.SetProfileDataByKey(player, "Abilities", abilities);
		if (!profile) {
			warn(`Failed to set abilities for player ${player.Name}.`);
			return false;
		}
		return true;
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
			warn(
				`No cooldowns found for player ${player.Name}. Creating a new cooldown map.`,
				"Check Validation - This should not happen.",
			);
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
		if (!this._validateResources(player, abilityKey)) {
			const message = createMessage(
				"Ability Activation Failed",
				`You do not have enough resources or ${AbilitiesMeta[abilityKey].displayName}`,
				"error",
			);
			ServerSend.SendMessageToPlayer(player, message);
			return false;
		}
		if (!this._validateCooldown(player, abilityKey)) {
			const message = createMessage(
				"Ability On Cooldown",
				`Your ${AbilitiesMeta[abilityKey].displayName} is on cooldown.`,
				"warning",
			);
			ServerSend.SendMessageToPlayer(player, message);
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

	// Private cleanup helper
	private destroyInternal() {
		// Clear cooldowns
		this._cooldowns.clear();
		// ...destroy any other resources/events...
		if (RunService.IsStudio()) warn(`AbilityService destroyed`);
	}
}
