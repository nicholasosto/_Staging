/// <reference types="@rbxts/types" />

/**
 * @file        SettingsScreen.ts
 * @module      SettingsScreen
 * @layer       Client/UI/Screens
 * @description UI screen for adjusting player settings.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Initial stub
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { GameWindow } from "../molecules";
import { ScreenKey } from "client/states";
import { PanelSelector } from "../molecules/Button/PanelSelector";
const Key: ScreenKey = "Settings";

export const SettingsScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			SettingsTest: PanelSelector({
				SelectorKey: "Helmet",
				Size: new UDim2(1, 0, 0, 50),
				Position: new UDim2(0, 0, 0, 50),
				BackgroundColor3: Color3.fromRGB(50, 50, 50),
				BorderSizePixel: 0,
			}),
		},
	});
};
