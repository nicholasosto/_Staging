/// <reference types="@rbxts/types" />

/**
 * @file        BarMeter.ts
 * @module      BarMeter
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
 * @lastUpdated  2025-07-01 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, New, Value, Computed } from "@rbxts/fusion";

export interface FillBarFrameProps extends Fusion.PropertyTable<Frame> {
	Gradient?: UIGradient;
	Progress: {
		Current: Fusion.Value<number>;
		Max: Fusion.Value<number>;
	};
}

export const FillBarFrame = (props: FillBarFrameProps): Frame => {
	const FillAmount = Computed(() => {
		if (!props.Progress) {
			return 0;
		}
		return math.clamp(props.Progress.Current.get() / props.Progress.Max.get(), 0, 1);
	});

	return New("Frame")({
		Name: "FillBarFrame",
		Size: UDim2.fromScale(FillAmount.get(), 1),
		[Children]: {
			Gradient: props.Gradient ?? {},
		},
	});
};
