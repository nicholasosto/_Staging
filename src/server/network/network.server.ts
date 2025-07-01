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
import { DataProfileController, BattleRoomService, SettingsService } from "server/services";

/* Factories and Types */
import { AttributeKey, AbilityKey, AbilitiesMeta, SettingKey } from "shared/definitions";
import Net from "@rbxts/net";
import { GetSoulPlayer } from "server/entity/player/SoulPlayer";
import { playAnimation } from "shared/assets/animations";

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

// Abilities -----------------------------------------------------
Network.Server.OnEvent("ActivateAbility", (player: Player, abilityKey: AbilityKey) => {
	const soulPlayer = GetSoulPlayer(player);
	const animationKey = AbilitiesMeta[abilityKey]?.animationKey;
	if (soulPlayer) {
		if (soulPlayer.CharacterModel) {
			playAnimation(soulPlayer.CharacterModel, animationKey);
		}
	} else {
		warn(`SoulPlayer not found for ${player.Name}`);
	}
});
Network.Server.Get("GetPlayerAbilities").SetCallback((player) => {
	// Handle the request for player abilities
	print(`Player ${player.Name} requested their abilities.`);
	const soulPlayer = GetSoulPlayer(player);
	return soulPlayer ? soulPlayer.Abilities : undefined;
});
// MATCHMAKING -----------------------------------------------------
Network.Server.Get("CreateRoom").SetCallback((player) => {
	return BattleRoomService.CreateRoom(player);
});

Network.Server.OnEvent("JoinRoom", (player, roomId: string) => {
	BattleRoomService.JoinRoom(player, roomId);
});

Network.Server.OnEvent("SetActiveGem", (player, roomId: string, gemId: string) => {
	BattleRoomService.SetActiveGem(player, roomId, gemId);
});

Network.Server.Get("GetPlayerSettings").SetCallback((player) => {
	return SettingsService.Get(player);
});

Network.Server.OnEvent("UpdatePlayerSetting", (player, key: SettingKey, value: boolean | string) => {
	SettingsService.Set(player, key, value);
});

print("Network server initialized and listening for events.");
