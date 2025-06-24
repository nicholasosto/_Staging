/// <reference types="@rbxts/types" />

/**
 * @file        InventoryGrid.ts
 * @module      InventoryGrid
 * @layer       Client/Organisms
 * @description Placeholder grid container for inventory slots.
 */

import Fusion from "@rbxts/fusion";
import { GamePanel } from "../atoms";
import { Layout } from "../style";

export const InventoryGrid = () => {
	return GamePanel({
		Name: "InventoryGrid",
		Layout: Layout.Grid(5, UDim2.fromOffset(48, 48)),
		Children: {},
	});
};
