/// <reference types="@rbxts/types" />

import Fusion from "@rbxts/fusion";

/**
 * @file        src/client/ui/molecules/PanelSelector.ts
 * @module      PanelSelector
 * @layer       Client/UI/Molecules
 * @description Rectangular panel with an imagebutton that opens a grid of selectable items. Once selected, the panel displays the selected item and its metadata.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-02 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

export interface PanelSelectorProps extends Fusion.PropertyTable<Frame> {
	SelectorKey: string;
}
