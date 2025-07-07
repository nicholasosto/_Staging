/// <reference types="@rbxts/types" />

/**
 * @file        Cleanup.ts
 * @module      PhysicsCleanup
 * @layer       Shared/Physics
 * @description Utilities for cleaning up temporary physics objects.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { Debris } from "@rbxts/services";

/**
 * Registers an instance for automatic destruction after `duration` seconds.
 *
 * @param instance - The instance to clean up
 * @param duration - Optional time in seconds before destruction
 */
export function register(instance: Instance, duration?: number) {
	if (duration !== undefined) {
		Debris.AddItem(instance, duration);
	}
}
