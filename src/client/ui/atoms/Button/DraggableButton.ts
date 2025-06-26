/// <reference types="@rbxts/types" />

/**
 * @file        DraggableButton.ts
 * @module      DraggableButton
 * @layer       Client/UI/Atoms
 * @description Button component that can be dragged using a `DragDetector`.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-03 by Codex – Added documentation header
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, OnEvent, PropertyTable } from "@rbxts/fusion";

export interface DraggableButtonProps extends PropertyTable<ImageButton> {
	OnClick?: () => void;
	OnDragStart?: (pos: Vector2) => void;
	OnDragContinue?: (pos: Vector2) => void;
	OnDragEnd?: (pos: Vector2) => void;
}

export function DraggableButton(props: DraggableButtonProps) {
	const dragButton = Fusion.New("ImageButton")({
		Name: props.Name ?? "DraggableButton",
		Size: props.Size ?? UDim2.fromOffset(100, 50),
		BackgroundTransparency: 0.9,
		ImageTransparency: 1,
		[OnEvent("Activated")]: props.OnClick,
		[Children]: {
			Image: Fusion.New("ImageLabel")({
				Name: "ButtonImage",
				ImageTransparency: 1,
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				Image: props.Image ?? "rbxassetid://121566852339881",
			}),
			DragDetector: Fusion.New("UIDragDetector")({
				Name: "DragDetector",
				Enabled: true,
				DragRelativity: Enum.UIDragDetectorDragRelativity.Absolute,
				DragStyle: Enum.UIDragDetectorDragStyle.Scriptable,
				[OnEvent("DragStart")]: (pos) => {
					props.OnDragStart?.(pos);
				},
				[OnEvent("DragContinue")]: (pos) => {
					props.OnDragContinue?.(pos);
				},
				[OnEvent("DragEnd")]: (pos) => {
					props.OnDragEnd?.(pos);
				},
			}),
		},
	});
	return dragButton;
}
