/// <reference types="@rbxts/types" />

/**
 * @file        Badge.ts
 * @module      Badge
 * @layer       Client/UI/Atoms
 * @description Displays a small badge with an icon and text, typically used for notifications or status indicators.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-09 by Trembus – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { Children, Computed, New, PropertyTable, Value } from "@rbxts/fusion";

export interface BadgeProps extends PropertyTable<TextButton> {
	TextValue: Value<string>; // Text displayed on the badge
	Corner: "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight"; // Position of the badge corner
}

export const Badge = (props: BadgeProps) => {
	const AnchorPoint = Computed(() => {
		switch (props.Corner) {
			case "TopLeft":
				return new Vector2(0, 0);
			case "TopRight":
				return new Vector2(1, 0);
			case "BottomLeft":
				return new Vector2(0, 1);
			case "BottomRight":
				return new Vector2(1, 1);
		}
	});

	const Position = Computed(() => {
		switch (props.Corner) {
			case "TopLeft":
				return UDim2.fromScale(0, 0);
			case "TopRight":
				return UDim2.fromScale(1, 0);
			case "BottomLeft":
				return UDim2.fromScale(0, 1);
			case "BottomRight":
				return UDim2.fromScale(1, 1);
		}
	});

	// Create the badge button with an icon and text

	const button = New("TextButton")({
		Name: props.Name ?? "Badge",
		AnchorPoint: AnchorPoint,
		Position: props.Position ?? UDim2.fromScale(0, 0),
		Size: props.Size ?? UDim2.fromOffset(34, 34),
		BackgroundTransparency: 0,
		BackgroundColor3: props.BackgroundColor3 ?? new Color3(1, 0, 0), // Default red background
		Text: Computed(() => props.TextValue.get()),
		[Children]: {
			Corner: New("UICorner")({
				CornerRadius: new UDim(0, 8), // Rounded corners
			}),
		},
	});

	return button;
};
