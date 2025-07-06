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
//import * as Dispatch from "./network/ClientDispatch";

/* =============================================== References ============================================= */

PlayerHUDScreen();
GemForgeScreen();
SettingsScreen();
TeleportScreen();
QuestsScreen(); // Assuming this is the correct screen name
ShopScreen();
CharacterScreen();
InventoryScreen();

/* =============================================== Network Tests ============================================= */
// Uncomment to test network calls
