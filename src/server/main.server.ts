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
import { RunEffect } from "./services/VisualEffectsService";
/* =============================================== Initialization ========================================= */

ServiceWrapper.Start(true);

/* --- Player Added Handler --- */
function onPlayerAdded(player: Player) {
	ServiceWrapper.RegisterPlayer(player);

	task.spawn(() => {
		const character = player.Character || player.CharacterAdded.Wait()[0];
		// Example usage of RunEffect
		warn(`Running effect for player: ${player.Name}`);
		// Run a visual effect on the character for 5 seconds
		RunEffect("HealingRing", character as Model, 5); // Run a healing effect for 5 seconds
	});
}

/* --- Player Removing Handler --- */
function onPlayerRemoving(player: Player) {
	ServiceWrapper.UnregisterPlayer(player);
}

/* =============================================== Main Execution ========================================= */
Players.GetPlayers().forEach(onPlayerAdded); // Register existing players
Players.PlayerAdded.Connect(onPlayerAdded);
Players.PlayerRemoving.Connect(onPlayerRemoving);
