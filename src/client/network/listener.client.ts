/// <reference types="@rbxts/types" />

/**
 * @file        listener.client.ts
 * @module      NetworkClientListener
 * @layer       Client/Network
 * @description Hooks client-side events to update local state.
 */

import PlayerState from "client/states/PlayerState";
import { ClientDispatch, Network, ServerDispatch } from "shared";

/* ------------------------------------ Network Listener ------------------------------------ */

// PLAYER RESOURCE: Listen for resource updates from the server
ServerDispatch.Client.OnEvent("ResourceUpdated", (key, current, max) => {
	const playerState = PlayerState.getInstance();
	const resource = playerState.Resources[key];
	if (resource) {
		resource.Current.set(current);
		resource.Max.set(max);
	} else {
		warn(`Resource ${key} not found in PlayerState.`);
	}
});

// // Profile Changed: Listen for profile changes from the server
// Network.Client.OnEvent("ProfileChanged", (data) => {
// 	print("Profile changed:", data);
// });
