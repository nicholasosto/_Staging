/// <reference types="@rbxts/types" />

/**
 * @file        src/client/main.client.ts
 * @module      ClientMain
 * @layer       Client
 * @description Main entry point for the client-side application.
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

/* =============================================== External Imports ============================================= */
import { GemForgeScreen, PlayerHUDScreen } from "./ui/screens";
import { CharacterScreen } from "./ui/screens/CharacterScreen";
import { InventoryScreen } from "./ui/screens/InventoryScreen";
import { SettingsScreen } from "./ui/screens/SettingsScreen";
import { ShopScreen } from "./ui/screens/ShopScreen";
import { TeleportScreen } from "./ui/screens/TeleportScreen";
import * as Dispatch from "./network/CallServer";

/* =============================================== References ============================================= */

PlayerHUDScreen();
GemForgeScreen();
SettingsScreen();
TeleportScreen();
ShopScreen();
CharacterScreen();
InventoryScreen();

/* =============================================== Network Tests ============================================= */
warn("Testing network calls...");
Dispatch.ActivateAbility("earthquake");
Dispatch.UpdatePlayerSetting("musicEnabled", true);
Dispatch.UpdatePlayerSetting("nickname", "PlayerOne");
Dispatch.IncreaseAttribute("str", 10);
Dispatch.GetPlayerAbilities().then((abilities) => {
	print(`Player Abilities: ${abilities?.join(", ")}`);
});
Dispatch.GetPlayerSettings().then((settings) => {
	print(`Player Settings:`, settings);
});
Dispatch.GetProfileData("Abilities")
	.then((abilities) => {
		print(`Profile Abilities: ${abilities?.join(", ")}`);
	})
	.catch((err) => {
		warn(`Error fetching profile data: ${err}`);
	});
warn("Network tests completed.");
