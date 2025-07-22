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
 * @lastUpdated  2025-07-10 by Codex – Tokenized text color
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, New, Value, Computed, OnChange } from "@rbxts/fusion";
import { BorderImage, BaseContainer, GameText } from "../atoms";
import { useToken } from "theme/hooks";

export interface BarMeterProps extends Fusion.PropertyTable<Frame> {
	ProgressState?: Computed<number>;
	CurrentValue?: Value<number>;
	MaxValue?: Value<number>;
	Gradient?: UIGradient;
	Text?: string;
	TextColor3?: Color3 | Fusion.Computed<Color3>;
}

export function BarMeter(props: BarMeterProps) {
	const TextValue = Value(props.Text ?? "Bar Meter");

	/* Fill Bar */
	const fillBar = New("Frame")({
		Name: "FillBar2",
		Size: Computed(() => {
			const size = UDim2.fromScale(props.ProgressState?.get() ?? 0, 1);
			return size;
		}),
		ZIndex: 90,
		[Children]: {
			Gradient: props.Gradient ?? {},
		},
		[OnChange("Size")]: (newSize: UDim2) => {
			// Debugging output to track size changes
			print(`FillBar size changed to: ${newSize}`);
		},
	});

	/* Text Label */
	const textColour = props.TextColor3 ?? useToken("textPrimary");

	const TextLabel = GameText({
		TextStateValue: TextValue,
		Size: UDim2.fromScale(0.9, 0.9),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		TextScaled: true,
		TextColor3: textColour,
		ZIndex: 100,
	});

	/* Container */
	const container = BaseContainer({
		Name: "BarMeter",
		Size: props.Size ?? UDim2.fromScale(1, 0.1),
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
