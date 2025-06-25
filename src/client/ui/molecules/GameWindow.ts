/// <reference types="@rbxts/types" />

/**
 * @file        GameWindow.ts
 * @module      GameWindow
 * @layer       Client/UI/Molecules
 * @description Panel-based window component with a title bar.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-02 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Children, Computed } from "@rbxts/fusion";
import { GamePanel } from "../atoms";
import { TitleBar } from "./TitleBar";

export interface GameWindowProps extends Fusion.PropertyTable<Frame> {
	Title?: string;
	VisibleState: Fusion.Value<boolean>;
	Children?: Fusion.ChildrenValue;
}

export function GameWindow(props: GameWindowProps) {
	props.Name = props.Name ?? "GameWindow";
	props.Size = props.Size ?? UDim2.fromOffset(300, 200);
	props.AnchorPoint = props.AnchorPoint ?? new Vector2(0.5, 0.5);
	props.Position = props.Position ?? UDim2.fromScale(0.5, 0.5);

	const content = GamePanel({
		Name: "WindowContent",
		BackgroundTransparency: 1,
		Size: UDim2.fromScale(1, 0.9),
		Position: UDim2.fromScale(0, 0.1),
		Children: props.Children ?? {},
	});

	return GamePanel({
		Name: props.Name,
		Size: props.Size,
		Position: props.Position,
		AnchorPoint: props.AnchorPoint,
		Visible: props.VisibleState,
		Children: {
			TitleBar: TitleBar({
				Title: props.Title ?? "Window",
				VisibleState: props.VisibleState,
			}),
			Content: content,
		},
	});
}
