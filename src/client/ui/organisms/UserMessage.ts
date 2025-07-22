/// <reference types="@rbxts/types" />

/**
 * @file        UserMessage.ts
 * @module      UserMessage
 * @layer       Client/Organisms
 * @description Center-screen popup for transient user messages.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-11 by Codex – Moved to organism layer
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { New, Children, Observer, Computed } from "@rbxts/fusion";
import { Players, TweenService } from "@rbxts/services";
import { useToken } from "theme/hooks";
import MessageSlice from "client/states/MessageSlice";

const slice = MessageSlice.getInstance();

export function UserMessage() {
	const textColor = useToken("textPrimary");

	const errorColor = useToken("healthFill");
	const colour = Computed(() => (slice.IsError.get() ? errorColor.get() : textColor.get()));

	const label = New("TextLabel")({
		Name: "MessageLabel",
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: UDim2.fromScale(0.5, 0.5),
		Size: UDim2.fromScale(0, 0),
		BackgroundTransparency: 0.4,
		BackgroundColor3: Color3.fromRGB(0, 0, 0),
		TextColor3: colour,
		TextScaled: true,
		Font: Enum.Font.SourceSansBold,
		Text: slice.Text,
		Visible: slice.Visible,
	});

	Observer(slice.Visible).onChange(() => {
		label.Visible = slice.Visible.get();
		if (slice.Visible.get()) {
			label.Size = UDim2.fromScale(0, 0);
			label.Position = UDim2.fromScale(0.5, 0.5);
			TweenService.Create(label, new TweenInfo(0.3, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
				Size: UDim2.fromScale(0.6, 0.1),
			}).Play();
			if (slice.IsError.get()) {
				TweenService.Create(
					label,
					new TweenInfo(0.1, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, 5, true),
					{ Position: new UDim2(0.5, 5, 0.5, 0) },
				).Play();
			}
		}
	});

	return New("ScreenGui")({
		Name: "UserMessage",
		Parent: Players.LocalPlayer.WaitForChild("PlayerGui"),
		ResetOnSpawn: false,
		[Children]: { Message: label },
	});
}
