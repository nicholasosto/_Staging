/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { ServiceWrapper } from "./ServiceWrapper";
import { Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */

ServiceWrapper.Start(true);

/* --- Player Added Handler --- */
function onPlayerAdded(player: Player) {
	ServiceWrapper.RegisterPlayer(player);
}

/* --- Player Removing Handler --- */
function onPlayerRemoving(player: Player) {
	ServiceWrapper.UnregisterPlayer(player);
}

/* =============================================== Main Execution ========================================= */
Players.GetPlayers().forEach(onPlayerAdded); // Register existing players
Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
