/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { Players } from "@rbxts/services";
import { SendProgressionUpdated, StartServerNetwork } from "./network";
import { ServiceWrapper } from "./ServiceWrapper";

const ServiceWrapperInstance = ServiceWrapper.GetInstance();

const { AbilityService, ProgressionService, BattleRoomService, ResourcesService, SettingsService, AttributesService } =
	ServiceWrapper;

/* =============================================== Initialization ========================================= */
StartServerNetwork();

print("Server main script initialized successfully.");

let lastUpdate = tick();

task.spawn(() => {
	let loopCount = 0;
	while (loopCount < 600) {
		// Run for 60 seconds (600 iterations at 0.1s intervals)
		// Run for 60 seconds
		const currentTime = tick();
		if (currentTime - lastUpdate >= 1) {
			print(`Server loop iteration: ${loopCount + 1}`);
			loopCount++;
			lastUpdate = currentTime;
			// Perform periodic server tasks here, e.g., updating game state, handling events, etc.
			Players.GetPlayers().forEach((player) => {
				ProgressionService.AddExperience(player, 10); // Example: Add 10 experience points every second
				SendProgressionUpdated(player);
			});
		}

		task.wait(0.1); // Adjust the wait time as needed for performance
	}
});
