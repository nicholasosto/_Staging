import { BorderImage, GamePanel } from "../atoms";
import { StateToggleButton } from "../molecules/Button/StateToggleButton";
import Fusion, { Children, ForPairs, ForValues, New } from "@rbxts/fusion";
import { Layout } from "../tokens";
import { GameImages, MenuButtonImageMap, ScreenKey, ScreenOrder, ScreenState } from "shared";

export interface HudMenuBarProps {
	ScreenStateKeys: ScreenKey[];
}

export const HUDMenuBar = (props: HudMenuBarProps) => {
	const HUDMenuButtons = ForValues(props.ScreenStateKeys, (value) => {
		return StateToggleButton({
			ScreenKey: value,
			Name: `${value}Button`,
			LayoutOrder: ScreenOrder[value] ?? 0,
			Image: MenuButtonImageMap[value] ?? GameImages.MenuButtonImage,
		});
	});
	const container = GamePanel({
		Name: "HUDMenuBar",
		Size: new UDim2(0, 300, 0, 50),
		BackgroundTransparency: 0.5,
		Layout: Layout.HorizontalSet(5),
		DragEnabled: true,
		Content: {
			Buttons: HUDMenuButtons,
		},
	});
	return container;
};
