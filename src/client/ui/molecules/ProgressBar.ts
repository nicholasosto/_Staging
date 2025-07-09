/// <reference types="@rbxts/types" />

/**
 * @file        ProgressBar.ts
 * @module      ProgressBar
 * @layer       Client/UI/Molecules
 * @description A visual representation of progress.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-09 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, Computed, New, PropertyTable, Value } from "@rbxts/fusion";
import { GameText } from "../atoms";

export interface ProgressBarProps extends Partial<PropertyTable<Frame>> {
	Progress: Computed<number>; // Value between 0 and 1 representing progress
	GradientColor?: UIGradient; // Optional gradient color for the bar
	BorderImage?: ImageLabel; // Optional border image for the bar
	Label?: string; // Optional label for the progress bar
}

export const ProgressBar = (props: ProgressBarProps) => {
	const progress = Computed(() => {
		return props.Progress.get() < 0 ? 0 : props.Progress.get() > 1 ? 1 : props.Progress.get();
	});

	const LabelText = Computed(() => {
		return GameText({
			TextStateValue: Value(props.Label !== undefined ? props.Label : "Progress"),
		});
	});

	const GradientColor = Computed(() => {
		return props.GradientColor !== undefined ? props.GradientColor : {};
	});

	const fillBar = New("Frame")({
		Name: "Fill",
		Size: UDim2.fromScale(progress.get(), 1),
		[Children]: {
			Gradient: GradientColor,
			LabelText: LabelText,
		},
	});

	// Create the progress bar frame
	const bar = New("Frame")({
		Name: `${props.Name ?? "ProgressBar"}`,
		Size: props.Size ?? UDim2.fromScale(1, 1),
		AnchorPoint: props.AnchorPoint ?? new Vector2(0, 0),
		Position: props.Position ?? UDim2.fromScale(0, 0),
		BackgroundColor3: new Color3(0.03, 0.02, 0.02),
		LayoutOrder: props.LayoutOrder ?? 0,
		[Children]: {
			Fill: fillBar,
		},
	});

	return bar;
};
