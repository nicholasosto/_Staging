/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import { loadProfile } from "./servicesz";

/* ================== Player Joined Event ================== */
Players.PlayerAdded.Connect((player) => {
	// Create a new player profile
	const profile = loadProfile(player);
	if (!profile) {
		player.Kick("Data failed to load!");
		return;
	} else {
		// Set the player's profile
		print(`Player ${player.Name} joined with profile:`, profile);
	}
});
