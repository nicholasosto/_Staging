/// <reference types="@rbxts/types" />

/**
 * @file        SoulPlayer.ts
 * @module      SoulPlayer
 * @layer       Server/Entity
 * @description Player wrapper storing profile and gameplay data.
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
 */

import { AbilitiesMeta, AbilityKey, PlayerDataDTO } from "shared";
import { loadAnimation, playAnimation } from "shared/assets/animations";
import { DataProfileController, PlayerProfile } from "server/services/DataService";
import { Profile } from "@rbxts/profileservice/globals";
import { LoadAbilityAnimations } from "../helpers";

/**
 * SoulPlayer class represents a base player entity in the game.
 * Its a container for the persistent data of a player, such as their abilities, stats, equipment, inventory, and more.
 */
/* ============================================= Player Registry <userId, SoulPlayer> ====================================================== */

export default class SoulPlayer {
	/* Static Properties */
	public static readonly Binder = new Map<number, SoulPlayer>();
	/* Static Methods */
	public static GetSoulPlayer(player: Player): SoulPlayer | undefined {
		return SoulPlayer.Binder.get(player.UserId);
	}

	/* Instance Properties - Private */
	private userId: number;
	private readonly profile?: Profile<PlayerProfile>;

	/* Instance Properties - Public */
	public readonly Player: Player;
	public CharacterModel?: Model;
	public Humanoid?: Humanoid;
	public readonly Abilities: AbilityKey[] = []; // Default abilities for testing

	/* Constructor */
	constructor(player: Player) {
		/* Set the Properties */
		this.Player = player;
		this.userId = player.UserId;
		this.profile = DataProfileController.GetProfile(player); // Data profile for the player
		this.CharacterModel = player.Character || player.CharacterAdded.Wait()[0]; // Character model, waits for character to be added if not present
		this.Humanoid = this.CharacterModel?.FindFirstChildOfClass("Humanoid") as Humanoid; // Humanoid

		LoadAbilityAnimations(this.CharacterModel, this.Abilities);

		// Connect events
		this.Player.CharacterAppearanceLoaded.Connect((character) => this.CharacterAppearanceLoaded(character));

		if (this.Humanoid) {
			// Connect to Humanoid health change event
			this.Humanoid.HealthChanged.Connect((health) => this.HumanoidHealthChanged(health));
		} else {
			warn(`Humanoid not found for player ${this.Player.Name}`);
		}

		// Register the player in the registry
		SoulPlayer.Binder.set(this.userId, this);
		print(`SoulPlayer created for ${this.Player.Name} with UserId: ${this.userId}`, this.profile);
	}

	private HumanoidHealthChanged(health: number) {
		if (health <= 0) {
			this.died();
		} else {
			print(`Humanoid health changed for ${this.Player.Name}: ${health}`);
		}
	}

	private CharacterAppearanceLoaded(character: Model) {
		this.CharacterModel = character;
		LoadAbilityAnimations(this.CharacterModel, this.Abilities);
	}

	public ActivateAbility(abilityKey: AbilityKey) {
		if (this.Abilities.includes(abilityKey)) {
			const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
			const character = this.CharacterModel;
			if (character) {
				playAnimation(character, animationKey);
			} else {
				warn(`Character model not found for ${this.Player.Name}`);
			}
		} else {
			warn(`Ability ${abilityKey} is not available for player ${this.Player.Name}`);
		}
	}

	/* Instance Methods */
	/**
	 * Increases the player's attribute by a specified amount.
	 * @param attributeKey The key of the attribute to increase.
	 * @param amount The amount to increase the attribute by.
	 */
	public IncreaseAttribute(attributeKey: string, amount: number) {
		// Logic to increase the player's attribute
		print(`Increasing attribute ${attributeKey} by ${amount} for player ${this.Player.Name}`);
		// Here you would typically update the player's profile or stats
	}

	/**
	 * Handles the player's death.
	 * This method should be called when the player dies in the game.
	 */
	private died() {
		// Handle player death logic here
		warn(`Player ${this.Player.Name} has died.`);
		SoulPlayer.Binder.delete(this.userId);
	}
}
