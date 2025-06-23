/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import DataProfileController from "./services/ProfileService";
DataProfileController.Start();

/* ================== Player Joined Event ================== */
Players.PlayerAdded.Connect((player) => {
	// Create a new player profile
	const profile = DataProfileController.GetProfile(player);
	if (profile) {
		// Initialize player profile data
		print(`Profile created for player: ${player.Name}`);
	} else {
		warn(`Failed to create profile for player: ${player.Name}`);
	}
});
