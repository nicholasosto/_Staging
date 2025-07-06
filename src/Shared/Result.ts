/// <reference types="@rbxts/types" />

/**
 * @file        Result.ts
 * @module      Result
 * @layer       Shared
 * @description Result helper types.
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

export type Ok<T> = { success: true; value: T };
export type Err<E> = { success: false; error: E };

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
	return { success: true, value };
}

export function err<E>(error: E): Err<E> {
	return { success: false, error };
}
