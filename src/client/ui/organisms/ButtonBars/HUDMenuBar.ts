/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuBar.ts
 * @module      HUDMenuBar
 * @layer       Client/Organisms
 * @description Horizontal container of HUD menu buttons.
 */
import { ForValues } from "@rbxts/fusion";
import { Layout } from "client/ui/tokens";
import { GamePanel, HorizontalContainer } from "client/ui/atoms";
import { HUDMenuButton } from "client/ui/molecules/Button/HUDMenuButton";
import { GameImages, MenuButtonImageMap } from "shared/assets";
import { ScreenKey, ScreenOrder } from "client/states";

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
	const container = HorizontalContainer({
		Name: "HUDMenuBar",
		Size: new UDim2(0, 380, 0, 56),
		BackgroundTransparency: 0.5,
		Content: {
			Buttons: HUDMenuButtons,
		},
	});
	return container;
};
