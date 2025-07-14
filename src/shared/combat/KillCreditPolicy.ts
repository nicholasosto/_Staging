/// <reference types="@rbxts/types" />

/**
 * @file        KillCreditPolicy.ts
 * @module      KillCreditPolicy
 * @layer       Shared/Combat
 * @description Pure helpers for decaying damage scores and kill credit rules.
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

/**
 * Accumulated damage contribution for a given attacker.
 */
export interface ContributionEntry {
	amount: number;
	lastHit: number;
}

/**
 * Calculate the current weighted score for a contribution entry.
 * Damage older than `halfLifeMs` loses half its value.
 *
 * @param entry - Contribution record to score.
 * @param nowMs - Current timestamp in milliseconds.
 * @param halfLifeMs - Half-life period for decay.
 * @returns Decayed score between 0 and entry.amount.
 *
 * @example
 * ```ts
 * const score = decayScore({ amount: 50, lastHit: now - 2000 }, now, 1000);
 * ```
 */
export function decayScore(entry: ContributionEntry, nowMs: number, halfLifeMs: number): number {
	const elapsed = math.max(nowMs - entry.lastHit, 0);
	const decayFactor = 0.5 ** (elapsed / halfLifeMs);
	return entry.amount * decayFactor;
}

/**
 * Determine if an attacker qualifies for kill credit.
 *
 * @param attackerScore - Attacker's decayed damage value.
 * @param totalDamage - Sum of all decayed damage values.
 * @param minShare - Minimum fraction of total required for credit.
 * @returns True if credit should be granted.
 */
export function qualifiesForKill(attackerScore: number, totalDamage: number, minShare: number): boolean {
	if (totalDamage <= 0) return false;
	return attackerScore / totalDamage >= minShare;
}
