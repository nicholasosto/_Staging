import { Rarity, RarityKeys } from "shared/types/base";
import { GamePanel, GamePanelProps } from "../Container/GamePanel";
import { Computed, ChildrenValue, New, Children, OnEvent } from "@rbxts/fusion";
import { BorderImage, GameImage } from "../Image";
import { ButtonSizes } from "client/ui/style";
import { GameImages } from "shared/assets";

const sampleItemMetadata = {
	DisplayName: "Sample Item",
	Rarity: "Common" as Rarity,
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
	const button = New("ImageButton")({
		Name: "GridItemButton",
		BackgroundTransparency: 0.2,
		BackgroundColor3: Color3.fromRGB(50, 50, 50),
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
			displayName: New("TextLabel")({
				Name: "DisplayName",
				Text: itemMetadata.DisplayName,
				TextColor3: Color3.fromRGB(255, 255, 255),
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
		Children: {
			ImageButton: button,
		},
	});

	return container;
}
