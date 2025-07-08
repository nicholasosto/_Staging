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
import { BorderImage, BaseContainer, GameText } from "../../atoms";
import { ComponentSizes } from "constants";

export interface BarMeterProps extends Fusion.PropertyTable<Frame> {
	ProgressState?: Computed<number>;
	CurrentValue?: Value<number>;
	MaxValue?: Value<number>;
	Gradient?: UIGradient;
	Text?: string;
}

export function BarMeter(props: BarMeterProps) {
	const TextValue = Value(props.Text ?? "Bar Meter");

	/* Fill Bar */
	const fillBar = New("Frame")({
		Name: "FillBar",
		Size: Computed(() => {
			const progress = props.ProgressState?.get() ?? 0;
			return new UDim2(progress, 0, 1, 0);
		}),
		ZIndex: 90,
		[Children]: {
			Gradient: props.Gradient ?? {},
		},
	});

	/* Text Label */
	const TextLabel = GameText({
		TextStateValue: TextValue,
		Size: UDim2.fromScale(0.9, 0.9),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		TextScaled: true,
		TextColor3: Color3.fromRGB(255, 255, 255),
		ZIndex: 100,
	});

	/* Container */
	const container = BaseContainer({
		Name: "BarMeter",
		Size: props.Size ?? ComponentSizes.ResourceBar,
		AnchorPoint: props.AnchorPoint ?? new Vector2(0.5, 0.5),
		Position: props.Position ?? new UDim2(0.5, 0, 0.5, 0),
		BorderImage: BorderImage.GothicMetal(),
		Content: {
			FillBar: fillBar,
			Text: TextLabel,
		},
	});

	return container;
}
