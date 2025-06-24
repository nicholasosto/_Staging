/// <reference types="@rbxts/types" />

/**
 * @file        ProfileService.ts
 * @module      ProfileService
 * @layer       Server/Services
 * @description Wrapper around ProfileService for player data.
 */

/* =============================================== Imports ====================================================== */
import { Players } from "@rbxts/services";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
// DTO
import { AttributesDTO, DefaultAttributes } from "shared/data";

/* ========================================== Profile Store Setup =============================================== */

// Datastore Name
const DATASTORE_NAME = "SoulSteelPlayerProfile";

// Main Profile Data Type
export interface PlayerProfile {
	attributes: AttributesDTO;
}

/* =============================================== Default Data =============================================== */

export const PlayerDTOTemplate: PlayerProfile = {
	attributes: DefaultAttributes,
};

/* Data Profile Controller */
export default class DataProfileController {
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
