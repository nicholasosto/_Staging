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

import Fusion, { ForPairs } from "@rbxts/fusion";
import { GameWindow, SettingListItem } from "../molecules";
import { ScreenKey, SettingsState } from "client/states";
import { SETTING_KEYS, SettingKey } from "shared/definitions/ProfileDefinitions/Settings";
import { Layout } from "../tokens";
const Key: ScreenKey = "Settings";

export const SettingsScreen = () => {
	const state = SettingsState.getInstance();
	const keys = [...SETTING_KEYS] as SettingKey[];
	const items = ForPairs(keys, (index, key: SettingKey) =>
		$tuple(
			key,
			SettingListItem({
				SettingKey: key,
				Size: new UDim2(1, 0, 0, 50),
				Value: state.Settings[key],
				LayoutOrder: index,
				OnChanged: (val) => state.set(key, val),
			}),
		),
	);
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			Layout: Layout.VerticalSet(2),
			SettingItems: items,
		},
	});
};
