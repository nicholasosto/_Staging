/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import { ManifestationForgeService, DataProfileController, BattleRoomService } from "./services";
import { AlienOrganism } from "./entity/AlienOrganism";
import { EntityResource } from "./entity/entityResource/EntityResource";

/* =============================================== Initialization ========================================= */
DataProfileController.Start();
ManifestationForgeService.Start();
BattleRoomService.Start();
EntityResource.SpawnResource(new CFrame(0, 10, 0));

/* ================== Player Joined Event ================== */
Players.PlayerAdded.Connect((player) => {
	// Create a new player profile
	const profile = DataProfileController.GetProfile(player);
	wait(1);
	if (profile) {
		// Initialize player profile data
		print(`Profile created for player: ${player.Name}`);
		//BattleRoomService.CreateRoom(player); // Automatically create a battle room for the player
	} else {
		warn(`Failed to create profile for player: ${player.Name}`);
		//BattleRoomService.CreateRoom(player); // Automatically create a battle room for the player
	}
	player.CharacterAdded.Connect((character) => {
		print(`Character added for player: ${player.Name}`);
	});
});
