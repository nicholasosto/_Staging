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

import { AbilitiesMeta, AbilityKey, ProfileDataKey, ProfileDataMap, loadAnimation, playAnimation } from "shared";
import { DataProfileController } from "server/services/DataService";
import { Profile } from "@rbxts/profileservice/globals";
import { CodeSettings } from "shared/constants/CodeSettings";

/**
 * SoulPlayer class represents a base player entity in the game.
 * Its a container for the persistent data of a player, such as their abilities, stats, equipment, inventory, and more.
 */
/* ============================================= Player Registry <userId, SoulPlayer> ====================================================== */

function DebugLog(message: string, ...args: unknown[]) {
	if (CodeSettings.DEBUG_PLAYER) {
		print(`[SoulPlayer] ${message}`, ...args);
	}
}

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

	/* Connections */
	private HumanoidDiedConnection?: RBXScriptConnection; // Connection for humanoid death event
	private CharacterAddedConnection?: RBXScriptConnection; // Connection for character added event

	/* Constructor */
	constructor(player: Player, character: Model) {
		/* Set the Properties */
		this.Player = player;
		this.userId = player.UserId;
		this.profile = DataProfileController.GetProfile(player); // Data profile for the player
		this.UpdateCharacter(character);
		// Register the player in the registry
		SoulPlayer.Binder.set(this.userId, this);
	}

	public UpdateCharacter(character: Model) {
		print(`Updating character for player ${this.Player.Name}.`, this.profile?.Data);
		/* Set References */
		this.CharacterModel = character;
		this.Humanoid = character.FindFirstChildOfClass("Humanoid") as Humanoid;

		/*Disconnect Previous Connections*/
		this.HumanoidDiedConnection?.Disconnect();
		this.CharacterAddedConnection?.Disconnect();

		/* Connect Humanoid Died Event */
		this.HumanoidDiedConnection = this.Humanoid?.Died.Connect(() => {
			this.died();
		});
		/* Connect Character Added Event */
		this.CharacterAddedConnection = this.Player.CharacterAdded.Connect((newCharacter) => {
			DebugLog(`Character added for player ${this.Player.Name}.`);
			this.UpdateCharacter(newCharacter);
		});
		/* Load Animations */
		this.loadAnimations();
		DebugLog(`Character updated for player ${this.Player.Name}.`, this.CharacterModel);
	}

	private loadAnimations() {
		if (this.CharacterModel === undefined) {
			warn(`Character model is undefined for player ${this.Player.Name}. Cannot load animations.`);
			return;
		}
		// Load animations for the character
		if (this.profile?.Data.Abilities === undefined) {
			warn(`Abilities are undefined for player ${this.Player.Name}. Cannot load animations.`);
			return;
		}

		this.profile.Data.Abilities.forEach((abilityKey: AbilityKey) => {
			const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
			const character = this.Player.Character || this.Player.CharacterAdded.Wait()[0];
			loadAnimation(character, animationKey);
		});
	}

	public ActivateAbility(abilityKey: AbilityKey) {
		const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
		const hasAbility = this.profile?.Data.Abilities?.includes(abilityKey);
		if (!animationKey) {
			warn(`Animation key for ability ${abilityKey} not found.`);
			return;
		}
		if (!hasAbility) {
			warn(`Player ${this.Player.Name} does not have ability ${abilityKey}.`);
			return;
		}
		const character = this.Player.Character || this.Player.CharacterAdded.Wait()[0];
		if (!character) {
			warn(`Character not found for player ${this.Player.Name}. Cannot activate ability ${abilityKey}.`);
			return;
		}
		//const track = loadAnimation(character, animationKey);
		// if (!track) {
		// 	warn(`Failed to load animation track for ${animationKey} on player ${this.Player.Name}.`);
		// 	return;
		// }
		//track.Play();
		playAnimation(character, animationKey);
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
		//SoulPlayer.Binder.delete(this.userId);
	}
}
