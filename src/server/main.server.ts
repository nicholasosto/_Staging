/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { ServerSend } from "./network";
import { DataService } from "./services";
import { ServiceWrapper } from "./ServiceWrapper";
import { Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */
function onCharacterLoaded(character: Model) {
	print(`Character loaded: ${character.Name}`);
}

function onDataLoaded(player: Player, data: unknown) {
	print(`Data loaded for player: ${player.Name}`, data);
	ServerSend.GameStateUpdated(player, true, true); // Notify client that data is loaded
}

function onPlayerAdded(player: Player) {
	player.CharacterAdded.Connect(onCharacterLoaded);
	DataService.RegisterPlayer(player);
	const profile = DataService.GetProfile(player);
	warn(`Data profile loaded for player: ${player.Name}`, profile);
}

function onPlayerRemoving(player: Player) {
	ServiceWrapper.UnregisterPlayer(player);
}

Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
