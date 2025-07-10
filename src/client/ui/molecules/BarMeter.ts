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

import Fusion, { Children, New, Value, Computed, OnChange } from "@rbxts/fusion";
import { BorderImage, BaseContainer, GameText } from "../atoms";

export interface BarMeterProps extends Fusion.PropertyTable<Frame> {
	Percent: Computed<number>;
	CurrentValue?: Value<number>;
	MaxValue?: Value<number>;
	Gradient?: UIGradient;
	Label?: Computed<string>;
}

export function BarMeter(props: BarMeterProps) {
	const TextValue =
		props.Label ??
		Computed(() => {
			const current = props.CurrentValue?.get() ?? 0;
			const max = props.MaxValue?.get() ?? 100;
			return tostring(current) + " / " + tostring(max);
		});

	const BarSize = Computed(() => {
		const current = props.CurrentValue?.get() ?? 0;
		const max = props.MaxValue?.get() ?? 100;
		print(`BarMeter: Current Value = ${current}, Max Value = ${max}`);
		if (max === 0) {
			print("BarMeter: Max Value is zero, returning 0%.");
			return UDim2.fromScale(0, 1);
		}
		const percentage = current / math.max(max, 1);

		const uDim2 = UDim2.fromScale(percentage, 1);
		return uDim2;
	});

	/* Fill Bar */
	const fillBar = New("Frame")({
		Name: "BarMeter",
		Size: BarSize,
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
		Name: props.Name ?? "BarMeter",
		Size: props.Size ?? UDim2.fromScale(1, 1),
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
