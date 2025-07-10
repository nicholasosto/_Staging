/// <reference types="@rbxts/types" />

/**
 * @file        ProgressBar.ts
 * @module      ProgressBar
 * @layer       Client/UI/Molecules
 * @description Simple horizontal progress bar used for capacity meters.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-10 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Computed } from "@rbxts/fusion";
import { BaseContainer, BorderImage, GameText } from "../atoms";
import { reactiveWidth } from "../tokens/uDim";

export interface ProgressBarProps extends Fusion.PropertyTable<Frame> {
	Percent: Computed<number>;
	Label?: Computed<string>;
	Border?: ImageLabel;
	Gradient?: UIGradient;
}

export const ProgressBar = (props: ProgressBarProps) => {
	/* ProgressBar Label */
	const Label = GameText({
		TextState: props.Label ?? Computed(() => `${math.floor(props.Percent.get() * 100)}%`),
	});

	// const ReactiveSize = Computed(() => {
	// 	return new UDim2(props.Percent.get(), 0, 1, 0);
	// });

	/* Fill Frame */
	const ProgressFrame = BaseContainer({
		Name: props.Name !== undefined ? props.Name + "_Fill" : "FillBar",
		BackgroundTransparency: 0,
		BackgroundColor3: Color3.fromRGB(255, 255, 255),
		Size: reactiveWidth(props.Percent),
		Content: {
			Gradient: props.Gradient,
		},
	});

	/* Fill Container */
	const ProgressContainer = BaseContainer({
		Name: props.Name ?? "ProgressBar",
		Size: props.Size ?? UDim2.fromScale(1, 1),
		BackgroundTransparency: 1,
		//BackgroundColor3: Color3.fromRGB(0, 0, 0),
		BorderImage: props.Border ?? BorderImage.GothicMetal(),
		Content: {
			Fill: ProgressFrame,
			Label: Label,
		},
	});

	return ProgressContainer;
};
