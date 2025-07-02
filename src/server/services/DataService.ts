/// <reference types="@rbxts/types" />

/**
 * @file        DataService.ts
 * @module      DataService
 * @layer       Server/Services
 * @description Wrapper around ProfileService for player data.
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

/* =============================================== Imports ====================================================== */
import { Players } from "@rbxts/services";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
// DTO
import { AbilityKey, AttributesDTO, DefaultAttributes } from "shared/definitions";

/* ========================================== Profile Store Setup =============================================== */

// Datastore Name
const DATASTORE_NAME = "SoulSteelPlayerProfile";

// Main Profile Data Type
export interface PlayerProfile {
	attributes: AttributesDTO;
	abilities?: AbilityKey[]; // Optional abilities array
}

/* =============================================== Default Data =============================================== */

export const PlayerDTOTemplate: PlayerProfile = {
	attributes: DefaultAttributes,
	abilities: ["fireball", "ice_shard", "lightning_bolt", "earthquake"], // Default abilities
};

/* Data Profile Controller */
export class DataProfileController {
	/* Singleton Instance */
	private static _instance: DataProfileController | undefined;

	/* ProfileService Initialization */
	private static _profileStore = ProfileService.GetProfileStore(DATASTORE_NAME, PlayerDTOTemplate);

	/* Map to store player profiles */
	private static _profileMap = new Map<Player, Profile<PlayerProfile>>(); // Map to store player profiles

	/* Connections */
	private static _playerAddedConnection: RBXScriptConnection | undefined;
	private static _playerRemovingConnection: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {
		print("Initialized.");
	}

	/* Start */
	public static Start(): DataProfileController {
		if (this._instance === undefined) {
			this._instance = new DataProfileController();
			this._initializeConnections(); // Initialize connections
		}
		return this._instance;
	}

	/* Initialize Connections */
	private static _initializeConnections() {
		/* Player Added */
		this._playerAddedConnection?.Disconnect();
		this._playerAddedConnection = Players.PlayerAdded.Connect((player: Player) => {
			this._onPlayerJoining(player);
		});

		/* Player Removing */
		this._playerRemovingConnection?.Disconnect();
		this._playerRemovingConnection = Players.PlayerRemoving.Connect((player: Player) => {
			this._onPlayerLeaving(player);
		});
	}

	/* On Player Joining */
	private static async _onPlayerJoining(player: Player) {
		/* Create Player Key */
		const playerKey = player.Name + "_" + tostring(player.UserId);
		try {
			// Attempt to load the profile for the player
			const profile = await this._profileStore.LoadProfileAsync(playerKey);

			// Warn if the profile is nil
			if (profile === undefined) {
				warn(`Failed to load profile for player: ${player.Name}`);
				return;
			}

			// Store the profile in the map
			this._profileMap.set(player, profile);

			// Print debug log
			print(`[${player.Name}] - Profile loaded:`, profile.Data);

			// Reconcile the profile to ensure it has the correct data structure
			profile.Reconcile();

			// Listen for logout and release events
			profile.ListenToRelease(() => {
				print(`[${player.Name}] - Profile released.`);
				this._profileMap.delete(player); // Remove the profile from the map
			});
		} catch (err) {
			warn(`Error loading profile for player ${player.Name}: ${err}`);
		}
	}

	/* On Player Leaving */
	private static _onPlayerLeaving(player: Player) {
		//print(`Player leaving: ${player.Name}`);
		this._profileMap.delete(player); // Remove the profile from the map
	}

	/* Get Profile */
	public static GetProfile(player: Player): Profile<PlayerProfile> | undefined {
		//print(`GetProfile(${player.Name})`);
		return this._profileMap.get(player); // Return the profile from the map
	}
}
