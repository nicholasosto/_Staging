/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { run } from "@rbxts/testez";
import { ServiceWrapper } from "./ServiceWrapper";
import { RunEvery } from "shared/helpers/RunCycle";
import { Players } from "@rbxts/services";
/* =============================================== Initialization ========================================= */

warn("Server: Main Script Initializing...");
ServiceWrapper.GetInstance(); // Start all services

Players.PlayerAdded.Connect((player) => {
	warn(`Player added: ${player.Name}`);
	task.spawn(() => {
		let progressionData = ServiceWrapper.ProgressionService.GetProgression(player);
		while (!progressionData) {
			warn(`Waiting for progression data for player: ${player.Name}`);
			task.wait(1); // Wait for 1 second before checking again
			progressionData = ServiceWrapper.ProgressionService.GetProgression(player);
		}
		warn(`Progression data ready for player: ${player.Name}`, progressionData);
	});
});
