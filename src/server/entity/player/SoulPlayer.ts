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

import { AbilitiesMeta, AbilityKey, PlayerDataDTO, ProfileDataKey } from "shared";
import { loadAnimation, playAnimation } from "shared/definitions/Animation";
import { DataProfileController } from "server/services/DataService";
import { ProfileDataMap } from "shared";
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
	private readonly profile?: Profile<ProfileDataMap>;

	/* Instance Properties - Public */
	public readonly Player: Player;
	public CharacterModel?: Model;
	public Humanoid?: Humanoid;

	/* Constructor */
	constructor(player: Player) {
		/* Set the Properties */
		this.Player = player;
		this.userId = player.UserId;
		this.profile = DataProfileController.GetProfile(player); // Data profile for the player
		print(`PROFILE: ${this.userId}`, this.profile);
		//this.CharacterModel = player.Character || player.CharacterAdded.Wait()[0]; // Character model, waits for character to be added if not present
		this.Humanoid = this.CharacterModel?.FindFirstChildOfClass("Humanoid") as Humanoid; // Humanoid

		//this.CharacterAppearanceLoaded(this.CharacterModel);

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
		print(`Character appearance loaded for ${this.Player.Name}`, character);
		this.profile?.Data.Abilities?.forEach((abilityKey) => {
			const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
			if (animationKey) {
				loadAnimation(character, animationKey);
			} else {
				warn(`Animation key for ability ${abilityKey} not found.`);
			}
		});
		print(`Abilities loaded for ${this.Player.Name}:`, this.profile?.Data.Abilities);
	}

	public ActivateAbility(abilityKey: AbilityKey) {
		const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
		if (this.profile?.Data.Abilities!.includes(abilityKey)) {
			const character = this.CharacterModel;
			if (character === undefined) {
				this.CharacterModel = this.Player.Character || this.Player.CharacterAdded.Wait()[0];
			}
		} else {
			warn(`Ability ${abilityKey} is not available for player ${this.Player.Name}`);
			return;
		}

		if (this.CharacterModel === undefined) return;
		playAnimation(this.CharacterModel, animationKey);
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

	public GetAbilities(): AbilityKey[] | undefined {
		// Return the player's abilities from their profile
		if (this.profile) {
			print(`Getting abilities for player ${this.Player.Name}:`, this.profile.Data.Abilities);
			return this.profile.Data.Abilities;
		} else {
			warn(`Profile not found for player ${this.Player.Name}`);
			return undefined;
		}
	}

	public GetData(dataKey: ProfileDataKey) {
		return (this.profile?.Data[dataKey] as ProfileDataMap[ProfileDataKey]) || undefined;
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
