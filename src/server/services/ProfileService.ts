/// <reference types="@rbxts/types" />

/**
 * @file        ProfileService.ts
 * @module      ProfileService
 * @layer       Server/Services
 * @description Wrapper around ProfileService for player data.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import ProfileService from "@rbxts/profileservice";
import { Profile, ProfileStore } from "@rbxts/profileservice/globals";
import { AttributesDTO } from "shared/data";
import { GemSaveData } from "shared/types";
/* =============================================== Constants =============================================== */

const DATASTORE_NAME = "SoulSteelPlayerProfile";

/* =============================================== Defaults =============================================== */

// Gems
const DefaultGems: Record<string, GemSaveData> = {};

// Attributes
const DefaultAttributes: AttributesDTO = {
	str: 10,
	agi: 10,
	vit: 10,
	int: 10,
	lck: 10,
	AvailablePoints: 5, // Starting with 5 points to distribute
	SpentPoints: 0, // No points spent initially
};

/* =============================================== Types =============================================== */

export interface PlayerProfile {
	xp: number;
	slots: number;
	attributes: AttributesDTO;
	gems: Record<string, GemSaveData>;
}

export const PlayerDTOTemplate: PlayerProfile = {
	xp: 0,
	slots: 0,
	attributes: DefaultAttributes,
	gems: DefaultGems,
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
		try {
			const profile = await this._profileStore.LoadProfileAsync(player.Name + "_" + tostring(player.UserId));
			if (profile === undefined) {
				warn(`Failed to load profile for player: ${player.Name}`);
				return; // Return if profile loading fails
			}
			this._profileMap.set(player, profile); // Store the profile in the map
			print(`[${player.Name}] - Profile loaded:`, profile.Data); // Debug log
			profile.Reconcile(); // Reconcile the profile
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
	/* Update Profile */

	/* Get Profile */
	public static GetProfile(player: Player): Profile<PlayerProfile> | undefined {
		//print(`GetProfile(${player.Name})`);
		return this._profileMap.get(player); // Return the profile from the map
	}
}
