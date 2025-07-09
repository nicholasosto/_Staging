/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuBar.ts
 * @module      HUDMenuBar
 * @layer       Client/Organisms
 * @description Horizontal container of HUD menu buttons.
 */
import { ListContainer } from "client/ui/atoms";
import { HUDMenuButton } from "client/ui/molecules/Button/HUDMenuButton";
import { GameImages, MenuButtonImageMap } from "shared/assets";
import { ScreenKey, ScreenOrder } from "client/states";
import { Badge } from "client/ui/atoms/Badge";
import { Value } from "@rbxts/fusion";

export interface HudMenuBarProps {
	ScreenStateKeys: ScreenKey[];
	layoutOrder?: number;
}

export const HUDMenuBar = (props: HudMenuBarProps) => {
	const tempBadge = Badge({
		Name: "TempBadge",
		TextValue: Value("14"),
		Corner: "TopRight",
	});

	const container = ListContainer({
		Name: "HUDMenuBar",
		Size: new UDim2(0, 380, 0, 56),
		Gap: 5,
		LayoutOrientation: "horizontal",
		BackgroundTransparency: 1,
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
