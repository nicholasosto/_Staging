/**
 *
 * @file        StateInfoDisplay.ts
 * @module      StateInfoDisplay
 * @layer       Client/UI/Molecules
 * @description Styleized single state display component for showing a single state value and label.
 */

import { Computed, Value } from "@rbxts/fusion";
import { BaseContainer, BaseContainerProps, GameText, ListContainer } from "client/ui/atoms";
import { AspectRatio, CornerRadius, Padding, Stroke } from "client/ui/tokens";

export interface StateInfoDisplayProps extends BaseContainerProps {
	Label: string;
	Value: Value<string> | Value<number>;
}

export function StateInfoDisplay(props: StateInfoDisplayProps) {
	const { Label, Value: value } = props;

	const label = GameText({
		TextState: Value(Label),
		Size: new UDim2(0.45, 0, 0.9, 0),
		TextSize: 24,
		TextScaled: false,
		LayoutOrder: 0,
	});

	const valueDisplay = GameText({
		TextState: value,
		Size: new UDim2(0.45, 0, 0.9, 0),
		TextSize: 24,
		TextScaled: false,
		LayoutOrder: 1,
	});

	const StateInfoDisplayInstance = ListContainer({
		Name: `StateInfoDisplay_${Label}`,
		Size: props.Size ?? new UDim2(0, 200, 0, 50),
		AnchorPoint: new Vector2(0.5, 0.5),
		LayoutOrientation: "horizontal",
		Position: new UDim2(0.5, 0, 0.5, 0),
		BackgroundColor3: props.BackgroundColor3 ?? new Color3(0.2, 0.2, 0.2),
		BackgroundTransparency: props.BackgroundTransparency ?? 0.5,
		BorderSizePixel: props.BorderSizePixel ?? 2,
		LayoutOrder: props.LayoutOrder ?? 0,
		ZIndex: props.ZIndex ?? 1,
		Content: {
			Stroke: Stroke(),
			Padding: Padding(2),
			ARC: AspectRatio(4 / 1),
			Corners: CornerRadius(8),
			Label: label,
			Value: valueDisplay,
		},
	});

	return StateInfoDisplayInstance;
}
