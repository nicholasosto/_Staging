/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { PlayerLifecycleService } from "./services";
import { Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */

PlayerLifecycleService.Start(false);


/* --- Player Added Handler --- */
function onPlayerAdded(player: Player) {
        PlayerLifecycleService.RegisterPlayer(player);
}

/* --- Player Removing Handler --- */
function onPlayerRemoving(player: Player) {
        PlayerLifecycleService.UnregisterPlayer(player);
}

/* =============================================== Main Execution ========================================= */
Players.GetPlayers().forEach(onPlayerAdded); // Register existing players
Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
