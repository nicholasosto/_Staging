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
import { GameImages, ScreenState } from "shared";
import { GameWindow } from "../molecules";
const dropAreaRef = Value<Frame | undefined>(undefined);

const DragWindowTest = GameWindow({
	Name: "DragWindowTest",
	Title: "Drag Test Window",
	VisibleState: ScreenState.DragDropScreenVisible,
	Size: UDim2.fromOffset(400, 300),
	Children: {
		DraggableButton1: DraggableButton({
			OnClick: () => {
				print("Button 1 clicked");
			},
			OnDragStart: (pos) => {
				print(`Button 1 drag started at ${pos}`);
			},
			OnDragContinue: (pos) => {
				print(`Button 1 dragging at ${pos}`);
			},
			OnDragEnd: (pos) => {
				print(`Button 1 drag ended at ${pos}`);
			},
		}),
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
		Layout: Layout.VerticalSet(10),
		Content: {
			GameWindow: DragWindowTest,
		},
	});

	return GameScreen({
		Name: "DragDropScreen",
		Content: {
			GameWindow: DragWindowTest,
		},
	});
};
