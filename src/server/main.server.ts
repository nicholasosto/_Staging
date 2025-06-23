import { Players } from "@rbxts/services";
import { loadProfile } from "./services";

/* ================== Player Joined Event ================== */
Players.PlayerAdded.Connect((player) => {
	// Create a new player profile
	const profile = loadProfile(player);
	if (!profile) {
		player.Kick("Data failed to load!");
		return;
	} else {
		// Set the player's profile
		print(`Player ${player.Name} joined with profile:`, profile);
	}
});
