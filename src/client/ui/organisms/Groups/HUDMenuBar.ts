/// <reference types="@rbxts/types" />

/**
 * @file        HUDMenuBar.ts
 * @module      HUDMenuBar
 * @layer       Client/Organisms
 * @description Horizontal container of HUD menu buttons.
 */
import { ListContainer } from "client/ui/atoms";
import { HUDMenuButton } from "client/ui/organisms/HUDMenuButton";
import { GameImages, MenuButtonImageMap } from "shared/assets";
import { SCREEN_KEYS, ScreenKey, ScreenOrder } from "client/states";
import { Badge } from "client/ui/atoms/Badge";
import { Value } from "@rbxts/fusion";

export interface HudMenuBarProps {
	layoutOrder?: number;
	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
}

export const HUDMenuBar = (props: HudMenuBarProps) => {
	const container = ListContainer({
		Name: "HUDMenuBar",
		Size: props.Size ?? new UDim2(0, 380, 0, 56),
		Position: props.Position ?? new UDim2(0, 10, 0, 10),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		Gap: 5,
		LayoutOrientation: "horizontal",
		BackgroundTransparency: 1,
		LayoutOrder: props.layoutOrder ?? 0,
		Content: SCREEN_KEYS.map((value) => {
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
