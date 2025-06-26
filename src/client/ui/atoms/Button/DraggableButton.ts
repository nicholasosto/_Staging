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

import Fusion, { Children, New, Value } from "@rbxts/fusion";
import { DragDetector, DragDetectorProps } from "../DragDetector"; // your existing DragDetector component
import { GameButton } from "./GameButton"; // your existing visual atom

export interface DraggableButtonProps extends Fusion.PropertyTable<ImageButton> {
	Ghost?: boolean; // whether to use a ghost clone during drag
	OnDrop?: (ghost: ImageButton | undefined) => void; // callback for when the drag ends
}
/* ---------- Draggable factory ---------- */
export function DraggableButton(props: DraggableButtonProps) {
	/* state for optional ghost clone */
	const ghostRef = Value<ImageButton | undefined>(undefined);
	print(`DraggableButton: ${props.Name} created`);
	/* the visual button that stays in the layout */
	const button = New("ImageButton")({
		[Children]: {
			Drag: DragDetector({
				Enabled: true,
				DragStyle: Enum.UIDragDetectorDragStyle.Scriptable,
				/* ——— EVENTS ——— */
				OnDragStart: (pos) => {
					print(`Drag started at: ${pos.X}, ${pos.Y}`);
					if (props.Ghost === undefined) return;

					const g = button.Clone() as ImageButton;
					g.Name = `${button.Name}_Ghost`;
					g.AnchorPoint = new Vector2(0.5, 0.5);
					g.Position = UDim2.fromOffset(pos.X, pos.Y);
					g.ZIndex += 1000;
					g.Parent = button.FindFirstAncestorWhichIsA("ScreenGui");
					button.Visible = false;
					ghostRef.set(g);
				},
				OnDragContinue: (pos) => {
					const g = ghostRef.get();
					if (g) g.Position = UDim2.fromOffset(pos.X, pos.Y);
				},
				OnDragEnd: () => {
					const g = ghostRef.get();
					if (props.OnDrop) props.OnDrop(g); // hit-test externally if you like
					if (g) g.Destroy();
					ghostRef.set(undefined);
					button.Visible = true;
				},
			}),
		},
	});

	return button;
}
