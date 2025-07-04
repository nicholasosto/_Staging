import PlayerState from "client/states/PlayerState";
import { Network, ServerDispatchEvents } from "shared";

/* ------------------------------------ Network Listener ------------------------------------ */

// PLAYER RESOURCE: Listen for resource updates from the server
ServerDispatchEvents.Client.OnEvent("ResourceUpdated", (key, current, max) => {
	const playerState = PlayerState.getInstance();
	const resource = playerState.Resources[key];
	if (resource) {
		resource.Current.set(current);
		resource.Max.set(max);
		print(`Resource ${key} updated: Current=${current}, Max=${max}`);
	} else {
		warn(`Resource ${key} not found in PlayerState.`);
	}
});

// Profile Changed: Listen for profile changes from the server
Network.Client.OnEvent("ProfileChanged", (data) => {
	print("Profile changed:", data);
});
