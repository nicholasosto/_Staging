/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuBar.ts
 * @module      HUDMenuBar
 * @layer       Client/Organisms
 * @description Horizontal container of HUD menu buttons.
 */
import { ForValues } from "@rbxts/fusion";
import { HorizontalContainer } from "client/ui/atoms";
import { HUDMenuButton } from "client/ui/molecules/Button/HUDMenuButton";
import { GameImages, MenuButtonImageMap } from "shared/assets";
import { ScreenKey, ScreenOrder } from "client/states";

export interface HudMenuBarProps {
	ScreenStateKeys: ScreenKey[];
	layoutOrder?: number;
}

export const HUDMenuBar = (props: HudMenuBarProps) => {
	const container = HorizontalContainer({
		Name: "HUDMenuBar",
		Size: new UDim2(0, 380, 0, 56),
		Gap: 5,
		LayoutOrder: props.layoutOrder ?? 0,
		Content: props.ScreenStateKeys.map((value) => {
			return HUDMenuButton({
				ScreenKey: value,
				Name: `${value}_Button`,
				LayoutOrder: ScreenOrder[value] ?? 0,
				Image: MenuButtonImageMap[value] ?? GameImages.MenuButtonImage,
			});
		}),
	});
	return container;
};
