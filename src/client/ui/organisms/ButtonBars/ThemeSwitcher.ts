/**
 * ThemeSwitcher.ts
 * @module      ThemeSwitcher
 * @layer       Client/UI/Organisms
 * @description Provides a UI component for switching themes.
 * * ╭───────────────────────────────╮
 * * │  Soul Steel · Coding Guide    │
 * * │  Fusion v4 · Strict TS · ECS  │
 * * ╰───────────────────────────────╯
 * * @author       Trembus
 * * @license      MIT
 * * @since        0.1.0
 * * @lastUpdated  2025-06-10 by Trembus
 * * @dependencies
 * *   @rbxts/fusion
 * *
 * * @remarks
 * *   This component uses Fusion for reactive state management and provides a simple UI for theme switching.
 * *
 */

import Fusion from "@rbxts/fusion";
import { ThemeState } from "client/states/ThemeState";
import { ThemeKey } from "theme";
import { HorizontalContainer, UIButton } from "client/ui/atoms";

const { Value, Computed } = Fusion;

const themeButtons = {
	[ThemeKey.CyberGothic]: () => {
		return UIButton({
			Label: "Cyber Gothic",
			Size: new UDim2(0.3, 0, 0.1, 0),
			OnClick: () => ThemeState.set(ThemeKey.CyberGothic),
			LayoutOrder: 1,
		});
	},
	[ThemeKey.SolarDrift]: () => {
		return UIButton({
			Label: "Solar Drift",
			Size: new UDim2(0.3, 0, 0.1, 0),
			OnClick: () => ThemeState.set(ThemeKey.SolarDrift),
			LayoutOrder: 2,
		});
	},
	[ThemeKey.Fateless]: () => {
		return UIButton({
			Label: "Fateless",
			Size: new UDim2(0.3, 0, 0.1, 0),
			OnClick: () => ThemeState.set(ThemeKey.Fateless),
			LayoutOrder: 3,
		});
	},
};

export const ThemeSwitcher = () => {
	const component = HorizontalContainer({
		Size: new UDim2(1, 0, 0.1, 0),
		LayoutOrder: 1,
		Gap: 10,
		Content: {
			CyberGothic: themeButtons[ThemeKey.CyberGothic](),
			SolarDrift: themeButtons[ThemeKey.SolarDrift](),
			Fateless: themeButtons[ThemeKey.Fateless](),
		},
	});

	return component;
};
