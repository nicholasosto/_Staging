/// <reference types="@rbxts/types" />

/**
 * @file        PlayerStatsState.ts
 * @module      PlayerStatsState
 * @layer       Client/State
 * @description Stores health, mana and stamina values.
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

import { Value } from "@rbxts/fusion";

export const health = new Value(100);
export const mana = new Value(50);
export const stamina = new Value(50);
