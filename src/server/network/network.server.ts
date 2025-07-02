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

import { Network, TestNetwork } from "shared/network";

/* Custom Services */
import { BattleRoomService, SettingsService } from "server/services";

/* Factories and Types */
import { AttributeKey, AbilityKey, SettingKey, NPCKey } from "shared/definitions";
import SoulPlayer from "server/entity/player/SoulPlayer";
import { NPC } from "server/entity";

// INCREASE ATTRIBUTE
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
	const soulPlayer = SoulPlayer.GetSoulPlayer(player);
	soulPlayer?.ActivateAbility(abilityKey);
});

Network.Server.Get("GetPlayerAbilities").SetCallback((player) => {
	// Handle the request for player abilities
	const soulPlayer = SoulPlayer.GetSoulPlayer(player);
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

// SETTINGS -----------------------------------------------------
Network.Server.Get("GetPlayerSettings").SetCallback((player) => {
	return SettingsService.GetSettings(player);
});

Network.Server.OnEvent("UpdatePlayerSetting", (player, key: SettingKey, value: boolean | string) => {
	SettingsService.SetSettings(player, key, value);
});

// Admin Actions -----------------------------------------------------
TestNetwork.Server.OnEvent("SPAWN_NPC", (player, npcKey: NPCKey) => {
	print(`Spawning NPC: ${npcKey}`);
	const playerCharacter = player.Character || player.CharacterAdded.Wait()[0];
	if (playerCharacter === undefined) {
		warn(`Player ${player.Name} has no character to spawn NPC into.`);
		return;
	}
	const playerCFrame = playerCharacter.GetPivot();
	const inFrontOffset = new Vector3(0, 0, -5); // Adjust as needed
	const spawnPosition = playerCFrame.mul(new CFrame(0, 0, -5)); // Spawn in front of player
	const spawnPosition2 = new CFrame(playerCFrame.Position.add(inFrontOffset));

	const npc = new NPC(npcKey, spawnPosition);
});
