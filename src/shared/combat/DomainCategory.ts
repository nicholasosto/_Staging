/// <reference types="@rbxts/types" />

/**
 * @file        DomainCategory.ts
 * @module      DomainCategory
 * @layer       Shared/Combat
 * @description Damage domain identifiers used for combat calculations.
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
 * Known elemental or thematic damage sources.
 */
export const DOMAIN_CATEGORIES = ["Blood", "Decay", "Spirit", "Steel"] as const;

/**
 * All valid domain category strings.
 */
export type DomainCategory = (typeof DOMAIN_CATEGORIES)[number];
