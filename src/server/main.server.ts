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
	WeaponService,
} from "./services";

/* =============================================== Initialization ========================================= */
DataProfileController.Start();
ManifestationForgeService.Start();
BattleRoomService.Start();
ResourcesService.Start();
SettingsService.Start();
WeaponService.Start();
//OrganismFood.SpawnResource(new CFrame(0, 10, 0));

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
