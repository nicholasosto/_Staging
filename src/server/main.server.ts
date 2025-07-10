/// <reference types="@rbxts/types" />

/**
 * @file        main.server.ts
 * @module      ServerMain
 * @layer       Server
 * @description Entry point for server-side logic.
 */

/* =============================================== Imports =============================================== */
import { ServiceWrapper } from "./ServiceWrapper";
/* =============================================== Initialization ========================================= */

warn("Server: Main Script Initializing...");

let lastUpdate = tick();

task.spawn(() => {
	let loopCount = 0;
	while (loopCount < 600) {
		// Run for 60 seconds (600 iterations at 0.1s intervals)
		// Run for 60 seconds
		const currentTime = tick();
		if (currentTime - lastUpdate >= 1) {
			loopCount++;
			lastUpdate = currentTime;
		}

		task.wait(0.1); // Adjust the wait time as needed for performance
	}
});
