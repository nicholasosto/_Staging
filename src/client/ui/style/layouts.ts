/// <reference types="@rbxts/types" />

/**
 * @file        layouts.ts
 * @module      Layout
 * @layer       Style
 * @description Provides pre-configured layout components for UI organization.
 *
 * ╭───────────────────────────────────╮
 * │  Soul Steel · Coding Guide        │
 * │  Fusion v4 · Strict TS · ECS      │
 * ╰───────────────────────────────────╯
 *
 * @author      Copilot
 * @license     MIT
 * @since       0.1.0
 * @lastUpdated 2025-06-23 by Copilot – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 *
 * @remarks
 *   Uses Fusion to create UIListLayout and UIGridLayout instances.
 */

import { New } from "@rbxts/fusion";

export const Layout = {
	VerticleSet: (padding?: number) =>
		New("UIListLayout")({
			Name: "VerticleSet",
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			HorizontalAlignment: Enum.HorizontalAlignment.Center,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			HorizontalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			VerticalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			Padding: padding ? new UDim(0, padding) : undefined,
		}),
	HorizontalSet: (padding?: number) =>
		New("UIListLayout")({
			Name: "HorizontalSet",
			FillDirection: Enum.FillDirection.Horizontal,
			SortOrder: Enum.SortOrder.LayoutOrder,
			HorizontalAlignment: Enum.HorizontalAlignment.Center,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			HorizontalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			VerticalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			Padding: padding ? new UDim(0, padding) : undefined,
		}),
	HorizontalList: (padding?: number) =>
		New("UIListLayout")({
			Name: "HorizontalList",
			FillDirection: Enum.FillDirection.Horizontal,
			SortOrder: Enum.SortOrder.LayoutOrder,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			HorizontalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			VerticalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			Padding: padding ? new UDim(0, padding) : undefined,
		}),
	VerticleList: (padding?: number) =>
		New("UIListLayout")({
			Name: "VerticleList",
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			HorizontalAlignment: Enum.HorizontalAlignment.Center,
			VerticalAlignment: Enum.VerticalAlignment.Top,
			HorizontalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			VerticalFlex: Enum.UIFlexAlignment.SpaceEvenly,
			Padding: padding ? new UDim(0, padding) : undefined,
		}),
	Grid: (padding?: number, cellSize?: UDim2) =>
		New("UIGridLayout")({
			Name: "GridLayout",
			CellSize: cellSize ?? UDim2.fromOffset(100, 100),
			SortOrder: Enum.SortOrder.LayoutOrder,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			VerticalAlignment: Enum.VerticalAlignment.Top,
			FillDirection: Enum.FillDirection.Horizontal,
			CellPadding: padding ? new UDim2(0, padding, 0, padding) : undefined,
		}),
};
