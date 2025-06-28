/// <reference types="@rbxts/types" />

/**
 * @file        dragHelpers.ts
 * @module      DragHelpers
 * @layer       Client/UI
 * @description Utility helpers for drag-and-drop interactions.
 */

/* --------------------------------- Drop Detection -------------------------- */
export function DroppedInside(drop: Frame | ImageButton, obj: Frame | ImageButton): boolean {
	const dp = drop.AbsolutePosition;
	const ds = drop.AbsoluteSize;
	const op = obj.AbsolutePosition;
	const os = obj.AbsoluteSize;
	const cx = op.X + os.X / 2;
	const cy = op.Y + os.Y / 2;
	return cx >= dp.X && cx <= dp.X + ds.X && cy >= dp.Y && cy <= dp.Y + ds.Y;
}
