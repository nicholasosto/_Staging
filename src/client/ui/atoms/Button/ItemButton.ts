/// <reference types="@rbxts/types" />

/**
 * @file        ItemButton.ts
 * @module      ItemButton
 * @layer       Client/UI/Atoms
 * @description Inventory item button wrapper using `UIButton`.
 */

import { RarityKey } from "shared/definitions/Rarity";
import { UIButton } from "./UIButton";

const sampleItemMetadata = {
	DisplayName: "Sample Item",
	Rarity: "Common" as RarityKey,
	itemId: "sample-item-123",
	Icon: "rbxassetid://124443221759409",
	OnClick: () => {
		print(`Item clicked: ${sampleItemMetadata.itemId}`);
	},
};

export const ItemButton = (id?: string) => {
	const meta = sampleItemMetadata; // placeholder until real lookup
	return UIButton({
		Icon: meta.Icon,
		Label: meta.DisplayName,
		Rarity: meta.Rarity,
		Variant: "panel",
		Draggable: true,
		OnClick: meta.OnClick,
	});
};
