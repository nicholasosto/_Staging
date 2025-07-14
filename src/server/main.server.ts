/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { DataService, ResourcesService, SpawnService } from "./services";
import { ServiceWrapper } from "./ServiceWrapper";
import { CollectionService, Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */

const ServerLoadState = ["DataServiceLoaded", "DataWrapperServicesLoaded", "GameplayServicesLoaded"] as const;
type ServerLoadStateType = (typeof ServerLoadState)[number];
type ServerLoadStateMap = Record<ServerLoadStateType, boolean>;
const serverLoadState: ServerLoadStateMap = {
	DataServiceLoaded: DataService.Start() !== undefined,
	DataWrapperServicesLoaded: ResourcesService.Start() !== undefined,
	GameplayServicesLoaded: false,
};


// function spawnCharacter(player: Player) {
// 	/* Temporary spawn logic */
// 	while (serverLoadState.DataServiceLoaded === false) {
// 		wait(0.1); // Wait until DataService is loaded
// 	}
// 	const HumanoidDescription = Players.GetHumanoidDescriptionFromUserId(player.UserId);
// 	if (HumanoidDescription) {
// 		player.LoadCharacterWithHumanoidDescription(HumanoidDescription);
// 	} else {
// 		warn(`No HumanoidDescription found for player: ${player.Name}`);
// 	}
// }

/* --- Player Added Handler --- */
function onPlayerAdded(player: Player) {

	/* Register the player with services */
	DataService.RegisterPlayer(player);
	SpawnService.RegisterPlayer(player);
	ResourcesService.RegisterPlayer(player);
	//spawnCharacter(player);
}

/* --- Player Removing Handler --- */
function onPlayerRemoving(player: Player) {
	ServiceWrapper.UnregisterPlayer(player);
}

/* =============================================== Main Execution ========================================= */
Players.GetPlayers().forEach(onPlayerAdded); // Register existing players
Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
