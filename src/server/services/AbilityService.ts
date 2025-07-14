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
import Ability from "server/classes/Ability";
import { ResourcesService } from "./ResourcesService";
import { SSEntity } from "shared/types/SSEntity";
import { RunService } from "@rbxts/services";
import { ServerSend } from "server/network";
import MessageService from "./MessageService";
import { createMessage } from "shared/definitions/Message";

const msgService = MessageService.Start();

/* =============================================== Service =============================================== */
export class AbilityService {
	private static _instance: AbilityService | undefined;
	private readonly _abilities = new Map<Player, Map<AbilityKey, Ability>>();

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

	/* ------------------------------- Player Registration -------------------- */
	public static RegisterPlayer(player: Player): void {
		const svc = this.Start();
		if (svc._abilities.has(player)) return;

		const keys = DataService.GetProfileDataByKey(player, "Abilities") ?? [];
		const map = new Map<AbilityKey, Ability>();
		keys.forEach((key) => map.set(key, new Ability(key)));
		svc._abilities.set(player, map);
	}

	public static UnregisterPlayer(player: Player): void {
		const svc = this.Start();
		svc._abilities.delete(player);
	}

	/* ------------------------------- Mutator Methods ------------------------------- */
	public static SetAbilities(player: Player, abilities: AbilityKey[]): boolean {
		const currentAbilities = DataService.GetProfileDataByKey(player, "Abilities");
		//#TODO: Replace with full validation
		if (!currentAbilities) {
			MessageService.Start().SendErrorToPlayer(player, "[AbilityService] No abilities found for player.");
			return false;
		}
		if (DataService.SetProfileDataByKey(player, "Abilities", abilities) === undefined) {
			return true;
		} else {
			MessageService.Start().SendErrorToPlayer(player, "[AbilityService] Failed to set abilities.");
			return false;
		}
	}

	/* ------------------------------- Ability Management ------------------------------- */
	public static AddAbility(player: Player, abilityKey: AbilityKey): boolean {
		const currentAbilities = this.GetAbilities(player);
		if (!currentAbilities) {
			MessageService.Start().SendErrorToPlayer(player, "[AbilityService] No abilities found for player.");
			return false;
		}
		if (!currentAbilities.includes(abilityKey)) {
			currentAbilities.push(abilityKey);
			this.SetAbilities(player, currentAbilities);
			const svc = this.Start();
			let map = svc._abilities.get(player);
			if (!map) {
				map = new Map<AbilityKey, Ability>();
				svc._abilities.set(player, map);
			}
			map.set(abilityKey, new Ability(abilityKey));
			msgService.SendSuccessToPlayer(player, `Added ability ${abilityKey} to player ${player.Name}.`);
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
			this.Start()._abilities.get(player)?.delete(abilityKey);
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
		const map = new Map<AbilityKey, Ability>();
		abilities.forEach((key) => map.set(key, new Ability(key)));
		this.Start()._abilities.set(player, map);
		return true;
	}

	private static _getAbility(player: Player, key: AbilityKey): Ability | undefined {
		return this.Start()._abilities.get(player)?.get(key);
	}

	/* ------------------------------- Validation ------------------------------------- */
	private static _playerHasAbility(player: Player, abilityKey: AbilityKey): boolean {
		const svc = this.Start();
		const map = svc._abilities.get(player);
		if (!map) {
			warn(`Player ${player.Name} has no abilities registered.`);
			return false;
		}
		return map.has(abilityKey);
	}

	private static _validateCooldown(player: Player, abilityKey: AbilityKey): boolean {
		const ability = this._getAbility(player, abilityKey);
		if (!ability) {
			warn(`_validateCooldown: ${player.Name} does not have ability ${abilityKey}`);
			return false;
		}
		if (!ability.isReady()) {
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
		const ability = this._getAbility(player, abilityKey);
		ability?.startCooldown();
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
		const character = player.Character as SSEntity | undefined;
		const humanoid = character?.FindFirstChildOfClass("Humanoid");
		if (!character || !humanoid || humanoid.Health <= 0) {
			warn(`Activate failed: ${player.Name} has no living character.`);
			return false;
		}

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
		warn(`Starting cooldown for ability ${abilityKey} for player ${player.Name}`);
		this._startCooldown(player, abilityKey);
		this._consumeResources(player, abilityKey);

		const characterCFrame = character.GetPivot();
		if (characterCFrame === undefined) return false;

		loadAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		playAnimation(character, AbilitiesMeta[abilityKey].animationKey);
		print(`Activated ability ${abilityKey} for player ${player.Name}.`);

		return true;
	}

	// Private cleanup helper
	private destroyInternal() {
		this._abilities.clear();
		// ...destroy any other resources/events...
		if (RunService.IsStudio()) warn(`AbilityService destroyed`);
	}
}
