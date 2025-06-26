/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuBar.ts
 * @module      HUDMenuBar
 * @layer       Client/Organisms
 * @description Horizontal container of HUD menu buttons.
 */

import { GamePanel } from "../atoms";
import { HUDMenuButton } from "../molecules/Button";
import Fusion, { ForValues } from "@rbxts/fusion";
import { Layout } from "../tokens";
import { GameImages, MenuButtonImageMap, ScreenKey, ScreenOrder } from "shared";

export interface HudMenuBarProps {
	ScreenStateKeys: ScreenKey[];
}

export const HUDMenuBar = (props: HudMenuBarProps) => {
	const HUDMenuButtons = ForValues(props.ScreenStateKeys, (value) => {
		return HUDMenuButton({
			ScreenKey: value,
			Name: `${value}Button`,
			LayoutOrder: ScreenOrder[value] ?? 0,
			Image: MenuButtonImageMap[value] ?? GameImages.MenuButtonImage,
		});
	});
	const container = GamePanel({
		Name: "HUDMenuBar",
		Size: new UDim2(0, 380, 0, 56),
		BackgroundTransparency: 0.5,
		Layout: Layout.HorizontalSet(5),
		Content: {
			Buttons: HUDMenuButtons,
		},
	});
	return container;
};
