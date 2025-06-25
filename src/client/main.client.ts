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
import { Children, New } from "@rbxts/fusion";
import { Players } from "@rbxts/services";
import { PlayerHUDScreen } from "./ui/screens";
import { EventButtons } from "./ui/organisms";

/* =============================================== References ============================================= */
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const ScreenGUI = New("ScreenGui")({
	Name: "Main GUI",
	DisplayOrder: 1000,
	ResetOnSpawn: false,
	Parent: playerGui,
	Enabled: false, // Initially disabled
	[Children]: {
		EventButtons: EventButtons(),
	},
});
PlayerHUDScreen();
ScreenGUI.Enabled = true; // Enable the GUI
