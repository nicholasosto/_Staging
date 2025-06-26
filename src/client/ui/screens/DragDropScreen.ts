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
const dropAreaRef = Value<Frame | undefined>(undefined);


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
		Children: {
			Button1: DraggableButton({
				Name: "Button1",
				Size: UDim2.fromScale(1, 0),
				BackgroundColor3: Color3.fromRGB(255, 100, 100),
				Image: GameImages.Ability.Blood_Elemental, // replace with your button image
				Ghost: true,
				OnDrop: (ghost) => {
					if (ghost && DroppedInside(dropAreaRef.get()!, ghost)) {
						ghost.Position = new UDim2(0.5, 0, 0.5, 0);
						ghost.Parent = dropArea;
					} else if (ghost) {
						ghost.Destroy();
					}
				},
			}),
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
