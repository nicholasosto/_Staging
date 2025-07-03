/**
 * @file CollapsibleStatusPanel.ts
 * @description This file defines the CollapsibleStatusPanel component, which is used to display a
 * collapsible panel for showing the status of various game elements. It includes a header with a
 * title and a button to toggle the panel's visibility, as well as a content area that
 * displays the status information.
 * @remarks This component is part of the game's user interface and is designed to be used in
 * conjunction with other UI components. It is built using the Roblox UI framework and follows
 * best practices for performance and usability.
 */

import { Children, New, Value } from "@rbxts/fusion";
import { Layout } from "../tokens";
import { StatusEffect } from "shared/definitions/StatusEffect";

export const StatusRowItem = (statusEffect: StatusEffect) => {
    const currentTIme = os.time(); // Get the current time in seconds
    const startTime = statusEffect.startTime; // Timestamp when the effect started
	const timeRemaining = Value(statusEffect.meta.duration - startTime); // Duration in seconds
	const container = New("Frame")({
		Size: new UDim2(1, 0, 0, 30),
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BackgroundTransparency: 0.5,
		[Children]: {
			Layout: Layout.HorizontalScroll(),
			StatusIcon: New("ImageLabel")({
				Name: "StatusIcon",
				Size: new UDim2(0, 30, 0, 30),
				BackgroundTransparency: 1,
				Image: statusEffect.meta.iconId,
			}),
			Label: New("TextLabel")({
				Name: "Status Description",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				Text: statusEffect.meta.description,
			}),
		},
	});
	return container;
};
