// @generated-scaffold
/// <reference types="@rbxts/types" />

/**
 * @file        Result.ts
 * @module      Result
 * @layer       Shared
 * @description Scaffolded result helper.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-07-06 by Codex – Scaffold generation
 */

export type Ok<T> = { success: true; value: T };
export type Err<E> = { success: false; error: E };

export type Result<T, E> = Ok<T> | Err<E>;
