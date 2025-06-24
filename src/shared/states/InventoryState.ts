import { ItemDTO } from "shared/data";

export interface InventoryState {
	slots: Map<number, ItemDTO>; // slotIdx → Item
	hovered?: number;
	dragging?: { from: number };
}
