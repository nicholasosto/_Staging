/// <reference types="@rbxts/types" />

/**
 * @file        DamageBucket.ts
 * @module      DamageBucket
 * @layer       Shared/Combat
 * @description Immutable representation of a single damage instance.
 *
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.0
 */

import { DomainCategory } from "./DomainCategory";

/**
 * @interface DamageBucket
 * Immutable damage descriptor used by combat services.
 */
export interface DamageBucket {
	readonly amount: number;
	readonly type: DomainCategory;
	readonly timestamp: number;
}

/**
 * Create a DamageBucket snapshot at the current time.
 * @param amount - Raw damage dealt.
 * @param type - Damage domain or element.
 * @returns New immutable damage bucket.
 *
 * @example
 * ```ts
 * const bucket = createDamageBucket(15, "Blood");
 * ```
 */
export function createDamageBucket(amount: number, domain: DomainCategory): DamageBucket {
	return {
		amount,
		type: domain,
		timestamp: os.clock() * 1000,
	} as const;
}
