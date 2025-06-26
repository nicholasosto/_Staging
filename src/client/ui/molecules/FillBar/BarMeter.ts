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
import { BorderImage, GamePanel } from "../../atoms";
import { useToken } from "theme/hooks";
import { ComponentSizes } from "constants";
import { FillBarFrame } from "./FillFrame";
import { SunriseGradient } from "client/ui/tokens";

export interface BarMeterProps extends Fusion.PropertyTable<Frame> {
	value: Fusion.Value<number> | number;
	max: Fusion.Value<number> | number;
	color?: Color3;
}

export function BarMeter(props: BarMeterProps) {
	const fillBar = FillBarFrame({
		Name: "FillBar",
		Size: UDim2.fromScale(1, 1),
		Progress: {
			Current:
				typeOf(props.value) === "number" ? Value(props.value as number) : (props.value as Fusion.Value<number>),
			Max: typeOf(props.max) === "number" ? Value(props.max as number) : (props.max as Fusion.Value<number>),
		},
		Gradient: SunriseGradient(),
	});

	return GamePanel({
		Name: "BarMeter",
		Size: props.Size ?? ComponentSizes.ResourceBar,
		BackgroundTransparency: 0.4,
		BorderImage: BorderImage.GothicMetal(),
		Content: {
			Fill: fillBar,
		},
	});
}
