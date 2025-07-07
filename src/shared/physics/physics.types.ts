/// <reference types="@rbxts/types" />

/**
 * @file        physics.types.ts
 * @module      PhysicsTypes
 * @layer       Shared/Physics
 * @description Shared option interfaces for physics helpers.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

export interface ForceOptions {
	/** Newtons applied each frame (VectorForce) */
	magnitude: number;
	/** If true, we clean up force + attachment on `duration` (sec) */
	duration?: number;
	/** Whether to scale by 1 / distance² (gravitational-style fall-off) */
	inverseSquare?: boolean;
}

export interface RopeOptions {
	length: number;
	elasticity?: number;
	winchPower?: number;
	/** Auto-destroy after this many seconds */
	duration?: number;
}
