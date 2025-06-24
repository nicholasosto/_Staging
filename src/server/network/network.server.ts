/// <reference types="@rbxts/types" />

/**
 * @file        src/server/network/network.server.ts
 * @module      NetworkServer
 * @layer       Server/Network
 * @description Handles network communication for the server.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */
/* =============================================== Imports =============================================== */
import { HttpService } from "@rbxts/services";

import { Network } from "shared/network";

/* Custom Services */
import { DataProfileController } from "server/services";

/* Factories and Types */
import { AttributeKey } from "shared/data";
import { GemFactory } from "server/factories";

// SPAWN MANIFESTATION
Network.Server.OnEvent("SpawnManifestation", (player, formId, abilityId, bonusId) => {
	GemFactory.createManifestationGem();
});

// INCREASE ATTRIBUTE
Network.Server.OnEvent("IncreaseAttribute", (player, attributeKey: AttributeKey, amount: number) => {
	// Handle the spawning of the manifestation
	print(`Player ${player.Name} requested to increase attribute ${attributeKey} by ${amount}`);

	const profile = DataProfileController.GetProfile(player);

	if (!profile) {
		warn(`Player profile not found for ${player.Name}`);
		return;
	}
	const AvailablePoints = profile?.Data.attributes.AvailablePoints ?? 0;
	if (AvailablePoints < amount) {
		warn(`Not enough available points to increase ${attributeKey} by ${amount}. Available: ${AvailablePoints}`);
		return;
	}

	profile.Data.attributes[attributeKey as keyof typeof profile.Data.attributes] += amount;
	profile.Data.attributes.AvailablePoints -= amount;
	print(`Player Profile:`, profile);
});

// ADD GEM to player profile
Network.Server.OnEvent("AddGem", (player, gemid: string) => {
	// Handle the addition of a gem to the player's profile
	print(`Player ${player.Name} requested to add gem with ID: ${gemid}`);
	const profile = DataProfileController.GetProfile(player);
	if (!profile) {
		warn(`Player profile not found for ${player.Name}`);
		return;
	}

	print(`Added gem to player ${player.Name}'s profile:`, profile.Data);
});

print("Network server initialized and listening for events.");
