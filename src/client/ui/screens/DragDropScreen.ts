/// <reference types="@rbxts/types" />

/**
 * @file        DragDropScreen.ts
 * @module      DragDropScreen
 * @layer       Client/UI/Screens
 * @description Demonstrates draggable buttons dropped onto a target panel.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-03 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, New, Value, OnEvent } from "@rbxts/fusion";
import { GameScreen, GamePanel } from "../atoms";
import { Layout } from "../tokens";

/* --------------------------------- Drop Detection -------------------------- */
function isInside(drop: Frame, obj: Frame) {
	const dp = drop.AbsolutePosition;
	const ds = drop.AbsoluteSize;
	const op = obj.AbsolutePosition;
	const os = obj.AbsoluteSize;
	const cx = op.X + os.X / 2;
	const cy = op.Y + os.Y / 2;
	return cx >= dp.X && cx <= dp.X + ds.X && cy >= dp.Y && cy <= dp.Y + ds.Y;
}

/* --------------------------------- Draggable Button Factory ---------------- */
function DraggableButton(name: string, dropRef: Fusion.Value<Frame | undefined>) {
	const panel = GamePanel({
		Name: name,
		Size: UDim2.fromOffset(120, 40),
		DragEnabled: true,
		OnDragEnd: () => {
			const drop = dropRef.get();
			if (drop && isInside(drop, panel)) {
				print(`Dropped ${panel.Name} into drop area`);
				print(`Instance properties: position=${panel.Position}, size=${panel.Size}`);
			}
		},
		Children: {
			Label: New("TextLabel")({
				Text: name,
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				TextScaled: true,
			}),
		},
	});
	return panel;
}

/* --------------------------------- Main Screen ----------------------------- */
export const DragDropScreen = () => {
	const dropAreaRef = Value<Frame | undefined>(undefined);

	const dropArea = GamePanel({
		Name: "DropArea",
		Size: UDim2.fromScale(0.7, 1),
		BackgroundColor3: Color3.fromRGB(60, 60, 60),
	});
	dropAreaRef.set(dropArea);

	const buttonPanel = GamePanel({
		Name: "ButtonPanel",
		Size: UDim2.fromScale(0.3, 1),
		BackgroundTransparency: 0.5,
		Scrolling: true,
		Layout: Layout.VerticalScroll(6),
		Children: {
			Button1: DraggableButton("Button1", dropAreaRef),
			Button2: DraggableButton("Button2", dropAreaRef),
			Button3: DraggableButton("Button3", dropAreaRef),
		},
	});

	return GameScreen({
		Name: "DragDropScreen",
		Children: {
			Layout: Layout.HorizontalSet(6),
			ButtonPanel: buttonPanel,
			DropArea: dropArea,
		},
	});
};

export const ExampleDragDropScreen = DragDropScreen;
