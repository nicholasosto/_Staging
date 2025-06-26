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

/* =============================================== Initialization ========================================= */
DataProfileController.Start();
ManifestationForgeService.Start();
BattleRoomService.Start();

/* ================== Player Joined Event ================== */
Players.PlayerAdded.Connect((player) => {
	// Create a new player profile
	const profile = DataProfileController.GetProfile(player);
	let alienCount = 0;
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
		new AlienOrganism(`TestAlien-${player.Name}-${alienCount}`, character.GetPivot());
		print(`CCCC  Alien created for player: ${player.Name}`);
		alienCount++;
		print(`Total aliens created for player ${player.Name}: ${alienCount}`);
	});
});
