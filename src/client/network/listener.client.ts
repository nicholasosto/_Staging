import PlayerState from "client/states/PlayerState";
import { Network } from "shared";

/* ------------------------------------ Network Listener ------------------------------------ */

// PLAYER RESOURCE: Listen for resource updates from the server
// Network.Client.OnEvent("ResourceUpdate", (key, current, max) => {
// 	const playerState = PlayerState.getInstance();
// 	if (playerState) {
// 		const resource = playerState.PlayerResources[key];
// 		if (resource) {
// 			resource.Current.set(current);
// 			resource.Max.set(max);
// 			print(`Resource ${key} updated: Current=${current}, Max=${max}`);
// 		} else {
// 			warn(`Resource ${key} not found in PlayerState.`);
// 		}
// 	} else {
// 		warn("PlayerState instance not found.");
// 	}
// });

// Profile Changed: Listen for profile changes from the server
Network.Client.OnEvent("ProfileChanged", (data) => {
	print("Profile changed:", data);
});
