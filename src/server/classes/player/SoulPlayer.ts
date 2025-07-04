// /// <reference types="@rbxts/types" />

// /**
//  * @file        SoulPlayer.ts
//  * @module      SoulPlayer
//  * @layer       Server/Entity
//  * @description Player wrapper storing profile and gameplay data.
//  *
//  * ╭───────────────────────────────╮
//  * │  Soul Steel · Coding Guide    │
//  * │  Fusion v4 · Strict TS · ECS  │
//  * ╰───────────────────────────────╯
//  *
//  * @author       Trembus
//  * @license      MIT
//  * @since        0.2.0
//  * @lastUpdated  2025-06-25 by Trembus – Initial creation
//  */

// import {
// 	AbilitiesMeta,
// 	AbilityKey,
// 	ProfileDataKey,
// 	ProfileDataMap,
// 	ServerDispatch,
// 	loadAnimation,
// 	playAnimation,
// } from "shared";
// import { DataProfileController } from "server/services/DataService";
// import { Profile } from "@rbxts/profileservice/globals";
// import { CodeSettings } from "shared/constants/CodeSettings";
// import { UpdateResource } from "server/network/ServerDispatch";

// /**
//  * SoulPlayer class represents a base player entity in the game.
//  * Its a container for the persistent data of a player, such as their abilities, stats, equipment, inventory, and more.
//  */
// /* ============================================= Player Registry <userId, SoulPlayer> ====================================================== */

// function DebugLog(message: string, ...args: unknown[]) {
// 	if (CodeSettings.DEBUG_PLAYER) {
// 		print(`[SoulPlayer] ${message}`, ...args);
// 	}
// }

// export default class SoulPlayer {
// 	/* Static Properties */
// 	public static readonly Binder = new Map<number, SoulPlayer>();
// 	/* Static Methods */
// 	public static GetSoulPlayer(player: Player): SoulPlayer | undefined {
// 		return SoulPlayer.Binder.get(player.UserId);
// 	}

// 	/* Instance Properties - Private */

// 	//private readonly profile?: Profile<ProfileDataMap>;

// 	/* Instance Properties - Public */
// 	public readonly Player: Player;
// 	public CharacterModel?: Model;
// 	public Humanoid?: Humanoid;

// 	/* Connections */
// 	private HumanoidDiedConnection?: RBXScriptConnection; // Connection for humanoid death event
// 	private HumanoidHealthChangedConnection?: RBXScriptConnection; // Connection for humanoid health change event
// 	private CharacterAddedConnection?: RBXScriptConnection; // Connection for character added event

// 	/* Constructor */
// 	constructor(player: Player, character: Model) {
// 		/* Set the Properties */
// 		this.Player = player;
// 		//this.profile = DataProfileController.GetProfile(player); // Data profile for the player
// 		this.InitializeConnections(character);
// 		// Register the player in the registry
// 		SoulPlayer.Binder.set(player.UserId, this);
// 	}

// 	public InitializeConnections(character: Model) {
// 		/* Set References */
// 		this.CharacterModel = character;
// 		this.Humanoid = character.FindFirstChildOfClass("Humanoid") as Humanoid;

// 		/*Disconnect Previous Connections*/
// 		this.HumanoidDiedConnection?.Disconnect();
// 		this.CharacterAddedConnection?.Disconnect();

// 		/* Connect Humanoid Died Event */
// 		this.HumanoidDiedConnection = this.Humanoid?.Died.Connect(() => {
// 			this.died();
// 		});

// 		/* Connect Humanoid Health Changed Event */
// 		this.HumanoidHealthChangedConnection = this.Humanoid?.HealthChanged.Connect((newHealth) => {
// 			/* Update the player's health resource */
// 			UpdateResource(this.Player, "Health", newHealth, this.Humanoid?.MaxHealth ?? 100);
// 		});
// 		/* Connect Character Added Event */
// 		this.CharacterAddedConnection = this.Player.CharacterAdded.Connect((newCharacter) => {
// 			this.InitializeConnections(newCharacter);
// 		});
// 		/* Load Animations */
// 		//this.loadAnimations();
// 	}

// 	public TakeDamage(amount: number) {
// 		/* Check if Humanoid exists */
// 		if (this.Humanoid) {
// 			/* Apply damage to the Humanoid */
// 			this.Humanoid.Health -= amount;
// 			UpdateResource(this.Player, "Health", this.Humanoid.Health, this.Humanoid.MaxHealth);
// 			/* Check if Humanoid is dead */
// 		} else {
// 			warn(`Humanoid not found for player ${this.Player.Name}. Cannot apply damage.`);
// 		}
// 	}

// 	/**
// 	 * Handles the player's death.
// 	 * This method should be called when the player dies in the game.
// 	 */
// 	private died() {
// 		// Handle player death logic here
// 		warn(`Player ${this.Player.Name} has died.`);
// 		//SoulPlayer.Binder.delete(this.userId);
// 	}
// }
