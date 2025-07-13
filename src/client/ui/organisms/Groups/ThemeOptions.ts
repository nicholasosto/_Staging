/// <reference types="@rbxts/types" />

/**
 * @file        ThemeOptions.ts
 * @module      ThemeOptions
 * @layer       Client/UI/Organisms
 * @description Organism for selecting and applying different UI themes.
 */

import Fusion from "@rbxts/fusion";
import { ThemeState } from "client/states/ThemeState";
import { ThemeKey } from "theme";
import { ListContainer, UIButton } from "client/ui/atoms";

const themeButtons = {
	[ThemeKey.CyberGothic]: () => {
		return UIButton({
			Label: "Cyber Gothic",
			Variant: "flat",
			Size: new UDim2(0.3, 0, 1, 0),
			OnClick: () => ThemeState.set(ThemeKey.CyberGothic),
			LayoutOrder: 1,
		});
	},
	[ThemeKey.SolarDrift]: () => {
		return UIButton({
			Label: "Solar Drift",
			Size: new UDim2(0.3, 0, 1, 0),
			OnClick: () => ThemeState.set(ThemeKey.SolarDrift),
			LayoutOrder: 2,
		});
	},
	[ThemeKey.Fateless]: () => {
		return UIButton({
			Label: "Fateless",
			BackgroundTransparency: 0.5,
			Size: new UDim2(0.3, 0, 1, 0),
			OnClick: () => ThemeState.set(ThemeKey.Fateless),
			LayoutOrder: 3,
		});
	},
};

export interface ThemeOptionProps {
	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
	LayoutOrder?: number;
}

export const ThemeOptions = (props: ThemeOptionProps) => {
	const Component = ListContainer({
		Name: "AdminButtonBar",
		Size: props.Size ?? UDim2.fromOffset(380, 50),
		Position: props.Position ?? UDim2.fromOffset(0, 0),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		LayoutOrientation: "horizontal",
		BackgroundTransparency: 0.5,
		Gap: 5,
		Content: {
			CyberGothic: themeButtons[ThemeKey.CyberGothic](),
			SolarDrift: themeButtons[ThemeKey.SolarDrift](),
			Fateless: themeButtons[ThemeKey.Fateless](),
		},
	});
	return Component;
};
