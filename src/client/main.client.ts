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
import { GameImages } from "shared/assets/image";
import { GamePanel, BorderImage, GameImage, Padding, ResourceBars, IconButton, GameTextScreen } from "./ui";
import { EventButtons } from "./ui/organisms/EventButtons";
import { AbilityInfoPanel } from "./ui/molecules/AbilityInfoPanel";
import { OrganismTestingScreen } from "./ui/screens/OrganismScreen";

/* =============================================== Events and Remotes ============================================= */

/* =============================================== UI Imports ========================================= */

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

// Drag Panel
const DragPanel = GamePanel({
	Name: "DragPanel",
	Size: UDim2.fromOffset(500, 500),
	DragEnabled: true,
	//BorderImage: BorderImage.GothicMetal(),
	Padding: Padding(4),
	Children: {
		TestOrganism: AbilityInfoPanel({
			abilityKey: "fireball", // Replace with actual ability key
		}),
	},
});

const ScreenGUI = New("ScreenGui")({
	Name: "Main GUI",
	DisplayOrder: 1000,
	ResetOnSpawn: false,
	Parent: playerGui,
	Enabled: false, // Initially disabled
	[Children]: {
		EventButtons: EventButtons(),
		DragPanel: DragPanel,
	},
});
GameTextScreen();
OrganismTestingScreen();
ScreenGUI.Enabled = true; // Enable the GUI
