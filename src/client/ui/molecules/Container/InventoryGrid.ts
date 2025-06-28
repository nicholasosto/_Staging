/// <reference types="@rbxts/types" />

/**
 * @file        InventoryGrid.ts
 * @module      InventoryGrid
 * @layer       Client/Organisms
 * @description Placeholder grid container for inventory slots.
 */

import Fusion, { ForPairs } from "@rbxts/fusion";
import { GamePanel, GemSlot } from "../../atoms";
import { Layout } from "../../tokens";
import { RarityKey } from "shared/definitions";

export interface InventoryGridProps {
	items: Map<string, { icon: string; rarity: RarityKey }>;
}

export const InventoryGrid = (props: InventoryGridProps) => {
	return GamePanel({
		Name: "InventoryGrid",
		Scrolling: true,
		Layout: Layout.Grid(5, UDim2.fromOffset(70, 70)),
		Content: {
			Slots: ForPairs(props.items, (id, data) =>
				$tuple(
					id,
					GemSlot({
						Name: `Slot-${id}`,
						Icon: data.icon,
						Rarity: data.rarity,
					}),
				),
			),
		},
	});
};
