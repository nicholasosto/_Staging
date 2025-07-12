/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { DataService } from "./services";
import { ServiceWrapper } from "./ServiceWrapper";
import { CollectionService, Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */

const ServerLoadState = ["DataServiceLoaded", "DataWrapperServicesLoaded", "GameplayServicesLoaded"] as const;
type ServerLoadStateType = (typeof ServerLoadState)[number];
type ServerLoadStateMap = Record<ServerLoadStateType, boolean>;
const serverLoadState: ServerLoadStateMap = {
	DataServiceLoaded: DataService.Start() !== undefined,
	DataWrapperServicesLoaded: false,
	GameplayServicesLoaded: false,
};

function onCharacterLoaded(character: Model) {
	CollectionService.AddTag(character, "SSEntity");
	print(`Character loaded: ${character.Name} and tag added.`);
}

function spawnCharacter(player: Player) {
	/* Temporary spawn logic */
	const HumanoidDescription = Players.GetHumanoidDescriptionFromUserId(player.UserId);
	if (HumanoidDescription) {
		player.LoadCharacterWithHumanoidDescription(HumanoidDescription);
	} else {
		warn(`No HumanoidDescription found for player: ${player.Name}`);
	}
}

/* --- Player Added Handler --- */
function onPlayerAdded(player: Player) {
	/* Connect the CharacterAdded event to handle character loading */
	player.CharacterAdded.Connect(onCharacterLoaded);

	/* Register the player with services */
	DataService.RegisterPlayer(player);
	spawnCharacter(player);
}

/* --- Player Removing Handler --- */
function onPlayerRemoving(player: Player) {
	ServiceWrapper.UnregisterPlayer(player);
}

/* =============================================== Main Execution ========================================= */
Players.GetPlayers().forEach(onPlayerAdded); // Register existing players
Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
