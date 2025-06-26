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
import { GameScreen, GamePanel, DraggableButton, DraggableButtonProps } from "../atoms";

import { Layout } from "../tokens";
import { DroppedInside } from "../helpers";
import { GameImages } from "shared";
import { GameWindow } from "../molecules";
const dropAreaRef = Value<Frame | undefined>(undefined);

const DragWindowTest = GameWindow({
	Name: "DragWindowTest",
	Title: "Drag Test Window",
	VisibleState: Value(true),
	Size: UDim2.fromOffset(400, 300),
	[Children]: {
		DraggableButton1: DraggableButton({
			Name: "DraggableButton1",
			Size: UDim2.fromOffset(100, 50),
			Position: UDim2.fromScale(0.1, 0.1),
			Image: GameImages.Control.Close,
			Ghost: true,
			OnDrop: (ghost) => {
				const dropArea = dropAreaRef.get();
				if (ghost && dropArea && DroppedInside(dropArea, ghost)) {
					// Successfully dropped inside the drop area
					ghost.Position = UDim2.fromScale(0.5, 0.5); // Center the ghost in the drop area
					ghost.Parent = dropArea; // Move the ghost to the drop area
					ghost.Visible = true; // Make it visible again
				} else if (ghost) {
					// Not dropped inside, destroy the ghost
					ghost.Destroy();
				}
			},
		} as DraggableButtonProps),
	},
});

/* --------------------------------- Main Screen ----------------------------- */
export const DragDropScreen = () => {
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
		//Layout: Layout.VerticalScroll(6),
		Content: {
			GameWindow: DragWindowTest,
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
