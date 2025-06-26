/// <reference types="@rbxts/types" />

/**
 * @file        TitleBar.ts
 * @module      TitleBar
 * @layer       Client/UI/Molecules
 * @description Simple title bar with a close button.
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

import Fusion, { Children, New, Value } from "@rbxts/fusion";
import { GamePanel, GameText, GameButton } from "../atoms";
import { Layout } from "../tokens";
import { GameImages } from "shared/assets";

export interface TitleBarProps {
	Title: string;
	VisibleState: Fusion.Value<boolean>;
}

export function TitleBar(props: TitleBarProps) {
	const titleText = GameText({
		Name: "WindowTitle",
		Text: props.Title,
		Size: UDim2.fromScale(0.9, 1),
		AnchorPoint: new Vector2(0, 0.5),
		Position: UDim2.fromScale(0, 0.5),
	});

	const closeBtn = GameButton({
		Name: "CloseButton",
		Size: UDim2.fromOffset(20, 20),
		Image: GameImages.Control.Close,
		OnClick: () => props.VisibleState.set(false),
	});

	return GamePanel({
		Name: "TitleBar",
		Size: UDim2.fromScale(1, 0.1),
		BackgroundTransparency: 0.3,
		Layout: Layout.HorizontalSet(2),
		Content: {
			TitleText: titleText,
			Close: closeBtn,
		},
	});
}
