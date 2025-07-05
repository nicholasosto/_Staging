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
import { GemForgeScreen, PlayerHUDScreen, QuestsScreen } from "./ui/screens";
import { CharacterScreen } from "./ui/screens/CharacterScreen";
import { InventoryScreen } from "./ui/screens/InventoryScreen";
import { SettingsScreen } from "./ui/screens/SettingsScreen";
import { ShopScreen } from "./ui/screens/ShopScreen";
import { TeleportScreen } from "./ui/screens/TeleportScreen";
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
