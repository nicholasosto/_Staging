/// <reference types="@rbxts/types" />

/**
 * @file        AbilityBarState.ts
 * @module      AbilityBarState
 * @layer       Client/State
 * @description Manages ability cooldown map.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.1.0
 * @lastUpdated  2025-07-06 by Codex
 */

// @generated-scaffold

import { Value, Computed } from "@rbxts/fusion";

export const cooldown = new Value(0);
export const percent = Computed(() => cooldown.get());
