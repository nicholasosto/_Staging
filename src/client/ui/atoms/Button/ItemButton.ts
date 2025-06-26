/// <reference types="@rbxts/types" />

/**
 * @file        ItemButton.ts
 * @module      ItemButton
 * @layer       Client/UI/Atoms
 * @description Clickable inventory item button with rarity border and icon.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-06-25 by Luminesa – Added documentation header
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import { RarityKey } from "shared";
import { GamePanel, GamePanelProps } from "../Container/GamePanel";
import { Computed, ChildrenValue, New, Children, OnEvent } from "@rbxts/fusion";
import { BorderImage, GameImage } from "../Image";
import { ButtonSizes } from "client/ui/tokens";
import { GameImages } from "shared/assets";
import { GameText } from "../Text";
import { useToken } from "theme/hooks";

const sampleItemMetadata = {
	DisplayName: "Sample Item",
	Rarity: "Common" as RarityKey,
	itemId: "sample-item-123",
	Icon: "rbxassetid://124443221759409", // Replace with actual icon ID
	OnClick: () => {
		print("Item clicked: " + sampleItemMetadata.itemId);
	},
};

export function ItemButton(itemId?: string) {
	const itemMetadata = sampleItemMetadata; // Replace with actual item metadata retrieval logic
	const borderImage = Computed(() => {
		switch (itemMetadata.Rarity) {
			case "Common":
				return BorderImage.GothicMetal();
			case "Rare":
				return BorderImage.RareRarity();
			default:
				return BorderImage.GothicMetal();
		}
	}).get();
	const bg = useToken("panelBg");
	const textColor = useToken("textPrimary");

	const button = New("ImageButton")({
		Name: "GridItemButton",
		BackgroundTransparency: 0.2,
		BackgroundColor3: bg,
		BorderSizePixel: 0,
		Image: borderImage.Image,
		Size: UDim2.fromScale(1, 1),
		[OnEvent("Activated")]: () => {
			if (itemMetadata.OnClick) {
				itemMetadata.OnClick();
			}
		},
		[Children]: {
			iconImage: GameImage({
				Image: itemMetadata.Icon,
				Size: UDim2.fromScale(0.8, 0.8),
				Position: UDim2.fromScale(0.5, 0.5),
				AnchorPoint: new Vector2(0.5, 0.5),
			}),
			displayName: GameText({
				Name: "DisplayName",
				Text: itemMetadata.DisplayName,
				TextColor3: textColor,
				TextSize: 14,
				Size: UDim2.fromScale(1, 0.2),
				Position: UDim2.fromScale(0, 0.8),
				BackgroundTransparency: 1,
			}),
		},
	});

	const container = GamePanel({
		Name: "ItemButtonContainer",
		Size: ButtonSizes.GridButton(),
		BackgroundTransparency: 1,
		DragEnabled: true,
		Content: {
			ImageButton: button,
		},
	});

	return container;
}
