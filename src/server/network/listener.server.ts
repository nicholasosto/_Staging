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

import { ClientDispatch, Network, TestNetwork } from "shared/network";

/* Custom Services */
import { BattleRoomService, SettingsService, NPCService, AbilityService, DataProfileController } from "server/services";

/* Factories and Types */
import { AttributeKey, AbilityKey, SettingKey, NPCKey, ProfileDataKey } from "shared/definitions";
import SoulPlayer from "server/classes/player/SoulPlayer";

// Attibutes -----------------------------------------------------
Network.Server.OnEvent("IncreaseAttribute", (player, attributeKey: AttributeKey, amount: number) => {
	const soulPlayer = SoulPlayer.GetSoulPlayer(player);
	if (soulPlayer) {
		//soulPlayer.IncreaseAttribute(attributeKey, amount);
	} else {
		warn(`SoulPlayer not found for ${player.Name}`);
	}
});

// Resources -----------------------------------------------------

// Abilities -----------------------------------------------------
Network.Server.OnEvent("ActivateAbility", (player: Player, abilityKey: AbilityKey) => {
	AbilityService.Activate(player, abilityKey);
});

// Network.Server.Get("GetPlayerAbilities").SetCallback((player) => {
// 	return AbilityService.GetAbilities(player);
// });

// MATCHMAKING -----------------------------------------------------
Network.Server.Get("CreateRoom").SetCallback((player) => {
	return BattleRoomService.CreateRoom(player);
});

Network.Server.OnEvent("JoinRoom", (player, roomId: string) => {
	BattleRoomService.JoinRoom(player, roomId);
});

// Gems -----------------------------------------------------
Network.Server.OnEvent("SetActiveGem", (player, roomId: string, gemId: string) => {
	BattleRoomService.SetActiveGem(player, roomId, gemId);
});

// SETTINGS -----------------------------------------------------
Network.Server.Get("GetPlayerSettings").SetCallback((player) => {
	return SettingsService.GetSettings(player);
});

Network.Server.OnEvent("UpdatePlayerSetting", (player, key: SettingKey, value: boolean | string) => {
	SettingsService.SetSettings(player, key, value);
});

// Admin Actions -----------------------------------------------------
TestNetwork.Server.OnEvent("SPAWN_NPC", (player, npcKey: NPCKey) => {
	const playerCharacter = player.Character || player.CharacterAdded.Wait()[0];
	if (playerCharacter === undefined) {
		warn(`Player ${player.Name} has no character to spawn NPC into.`);
		return;
	}
	const playerCFrame = playerCharacter.GetPivot();
	const spawnCFrame = playerCFrame.mul(new CFrame(0, 0, -5));
	NPCService.Spawn(npcKey, spawnCFrame);
});

ClientDispatch.Server.Get("GetData").SetCallback((player, dataKey: ProfileDataKey) => {
	const playerProfile = DataProfileController.GetProfile(player);
	if (playerProfile === undefined) {
		warn(`SoulPlayer not found for ${player.Name}`);
		return undefined;
	}
	if (playerProfile.Data[dataKey] === undefined) {
		warn(`Profile data not found for ${player.Name}: ${dataKey}`);
		return undefined;
	}
	return playerProfile.Data[dataKey];
});
