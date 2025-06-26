import { BorderImage, GamePanel } from "../atoms";
import { StateToggleButton } from "../molecules/Button/StateToggleButton";
import Fusion, { Children, New } from "@rbxts/fusion";
import { Layout } from "../tokens";
import { ScreenState } from "shared";

export const HUDMenuBar = () => {
	const container = GamePanel({
		Name: "HUDMenuBar",
		Size: new UDim2(1, 0, 0, 50),
		BackgroundTransparency: 0.5,
		BorderImage: BorderImage.GothicMetal(),
		Layout: Layout.HorizontalSet(5),
		Content: {
			GemForgeButton: StateToggleButton({
				SelectedState: ScreenState.GemForgeScreenVisible,
				Name: "GemForgeButton",
			}),
		},
	});
	return container;
};
