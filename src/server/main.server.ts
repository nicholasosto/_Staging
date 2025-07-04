/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import {
	ManifestationForgeService,
	DataProfileController,
	BattleRoomService,
	ResourcesService,
	SettingsService,
} from "./services";

//import SoulPlayer from "./classes/player/SoulPlayer";

/* =============================================== Initialization ========================================= */
DataProfileController.Start();
ManifestationForgeService.Start();
BattleRoomService.Start();
ResourcesService.Start();
SettingsService.Start();
//OrganismFood.SpawnResource(new CFrame(0, 10, 0));

// /* ================== Player Joined Event ================== */
// Players.PlayerAdded.Connect((player) => {
// 	if (SoulPlayer.GetSoulPlayer(player)) {
// 		warn(`SoulPlayer already exists for ${player.Name}.`);
// 		return;
// 	}
// 	const character = player.Character || player.CharacterAdded.Wait()[0];
// 	/* Create a new SoulPlayer instance */
// 	new SoulPlayer(player, character);
// });

// task.spawn(() => {
// 	while (Players.GetPlayers().size() >= 0) {
// 		Players.GetPlayers().forEach((player) => {
// 			ResourcesService.ModifyResource(player, "Health", -1);
// 		});
// 		task.wait(1);
// 		print("HB: Tick");
// 	}
// 	print("Server is now running.");
// });
print("Server main script initialized successfully.");
