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
import { BorderImage, GamePanel } from "../atoms";
import { useToken } from "theme/hooks";
import { ComponentSizes, Sizes } from "constants";

export interface BarMeterProps {
	value: Fusion.Value<number>;
	max: Fusion.Value<number> | number;
	color?: Color3;
	Size?: UDim2;
}

export function BarMeter(props: BarMeterProps) {
	const maxVal = typeOf(props.max) === "number" ? Value(props.max as number) : (props.max as Fusion.Value<number>);
	const ratio = Computed(() => math.clamp(props.value.get() / maxVal.get(), 0, 1));

	const defaultColor = useToken("textPrimary");

	const fillSize = Computed(() => UDim2.fromScale(ratio.get(), 1));
	const fill = New("Frame")({
		Name: "Fill",
		BackgroundColor3: props.color ?? defaultColor,
		Size: fillSize,
		BackgroundTransparency: 0.2,
	});

	return GamePanel({
		Name: "BarMeter",
		Size: props.Size ?? ComponentSizes.ResourceBar,
		BackgroundTransparency: 0.4,
		BorderImage: BorderImage.GothicMetal(),
		Content: {
			Fill: fill,
		},
	});
}
