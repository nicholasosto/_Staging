/// <reference types="@rbxts/types" />

/**
 * @file        GemForgeScreen.ts
 * @module      GemForgeScreen
 * @layer       Client/UI/Screens
 * @description UI screen for forging manifestation gems.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Reconstructed screen
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { GameWindow } from "../molecules";
import { ScreenKey } from "client/states";
import { GamePanel } from "../atoms";
import { Layout, Padding } from "../tokens";
import { GemSlotKey } from "shared";
const Key: ScreenKey = "GemForge";

const GemSlot = (slotKey: GemSlotKey) => {
	const container = GamePanel({
		Name: `${Key}_${slotKey}Slot`,
		Size: new UDim2(1, 0, 0, 100),
		Padding: Padding(5),
		Layout: Layout.HorizontalScroll(),
		BackgroundTransparency: 0,
		Content: [],
	});

	return container;
};

const GemSlotContainer = () => {
	const SubPanel = GamePanel({
		Name: `${Key}_SlotPanel`,
		Size: new UDim2(0.5, 0, 1, 0),
		Padding: Padding(5),
		Layout: Layout.VerticalScroll(),
		BackgroundTransparency: 0.5,
		Content: {
			FormSlot: GemSlot("FORM"),
			AbilitySlot: GemSlot("ABILITY"),
			PhysicalSlot: GemSlot("PHYSICAL"),
			SummonSlot: GemSlot("SUMMON"),
		},
	});
	return SubPanel;
};

export const GemForgeScreen = () => {
	return GameWindow({
		ScreenKey: Key,
		Name: `${Key}Screen`,
		Content: {
			SlotContainer: GemSlotContainer(),
		},
	});
};
