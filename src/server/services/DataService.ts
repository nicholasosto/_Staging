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
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
// DTO
import { AbilityKey, DefaultAttributes, DefaultCurrency, DefaultSettings, ProfileDataMap } from "shared/definitions";
import { CodeSettings } from "shared/constants/CodeSettings";
import { DefaultProgression } from "shared/definitions/ProfileDefinitions/Progression";

/* ========================================== Profile Store Setup =============================================== */

// Datastore Name
const DATASTORE_NAME = "A_SoulSteelPlayerProfile";

const DefaultProfileData: ProfileDataMap = {
	// Player Profile Data
	Abilities: ["earthquake", "fireball", "ice_shard"] as AbilityKey[], // Default abilities
	Attributes: DefaultAttributes, // Player attributes
	Progression: DefaultProgression, // Player progression data
	Settings: DefaultSettings,
	Currency: DefaultCurrency,
};

/* Data Profile Controller */
export class DataService {
	/* Singleton Instance */
	private static _instance: DataService | undefined;

	/* ProfileService Initialization */
	private static _profileStore = ProfileService.GetProfileStore(DATASTORE_NAME, DefaultProfileData);

	/* Map to store player profiles */
	private static _profileMap = new Map<Player, Profile<ProfileDataMap>>(); // Map to store player profiles


	/* Constructor */
	private constructor() {
		print("DataProfileController Initialized.");
	}

	/* Start */
	public static Start(): DataService {
		if (this._instance === undefined) {
			this._instance = new DataService();
		}
		return this._instance;
	}

	/* On Player Joining */
	public static async RegisterPlayer(player: Player) {
		/* Create Player Key */
		const playerKey = player.Name + "_" + tostring(player.UserId);
		try {
			// Attempt to load the profile for the player
			const profile = await this._profileStore.LoadProfileAsync(playerKey);

			// Warn if the profile is nil
			if (profile === undefined) {
				warn(`ProfileService: (1) - Failed to load profile for player: ${player.Name}`);
				return;
			}

			// Store the profile in the map
			this._profileMap.set(player, profile);

			// Reconcile the profile to ensure it has the correct data structure
			profile.Reconcile();

			// Listen for logout and release events
			profile.ListenToRelease(() => {
				print(`[${player.Name}] - Profile released.`);
				this._profileMap.delete(player); // Remove the profile from the map
			});
		} catch (err) {
			warn(`ProfileService: (2) - Error loading profile for player ${player.Name}: ${err}`);
		}
		if (CodeSettings.DEBUG_DATASERVICE) {
			print(`DataProfileController._onPlayerJoining(${player.Name}) called.`, this._profileMap.get(player));
		}
	}

	/* On Player Leaving */
	public static UnRegisterPlayer(player: Player) {
		//print(`Player leaving: ${player.Name}`);
		this._profileMap.delete(player); // Remove the profile from the map
	}

	/* Get Profile */
	public static GetProfile(player: Player): Profile<ProfileDataMap> | undefined {

		while (this._profileMap.get(player) === undefined) {
			// If the profile is undefined, wait for it to be created
			warn(`DataProfileController.GetProfile: Waiting for profile for player ${player.Name}`);
			task.wait(1); // Wait for 1 second before checking again
		}

		return this._profileMap.get(player); // Return the profile from the map
	}
}
