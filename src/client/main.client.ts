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
import { PlayerStateInstance } from "./states/PlayerState";
import {
	GemForgeScreen,
	PlayerHUDScreen,
	QuestsScreen,
	CharacterScreen,
	SettingsScreen,
	TeleportScreen,
	ShopScreen,
	InventoryScreen,
} from "./ui/screens";
import { LoadingScreen } from "./ui/screens/LoadingScreen";
//import * as Dispatch from "./network/ClientDispatch";

/* =============================================== References ============================================= */
const loadingScreen = LoadingScreen(); // Ensure the loading screen is initialized
while (loadingScreen.Enabled) {
	wait(0.2); // Wait until the loading screen is no longer enabled
}
PlayerHUDScreen();
GemForgeScreen();
SettingsScreen();
TeleportScreen();
QuestsScreen(); // Assuming this is the correct screen name
ShopScreen();
CharacterScreen();
InventoryScreen();

/* =============================================== Network Tests ============================================= */
