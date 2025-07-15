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
export const RopeKeys = ["Strong", "Medium", "Weak"] as const;
export type RopeKey = (typeof RopeKeys)[number];
export interface RopeOptions {
	length: number;
	elasticity?: number;
	winchPower?: number;
	winchSpeed?: number;
	winchResponsiveness?: number;
	/** Auto-destroy after this many seconds */
	duration?: number;
}

export const RopeTemplates: Record<RopeKey, RopeOptions> = {
	Strong: {
		length: 10,
		elasticity: 0.8,
		winchPower: 100,
		winchSpeed: 5,
		winchResponsiveness: 0.5,
		duration: 60,
	},
	Medium: {
		length: 7,
		elasticity: 0.6,
		winchPower: 80,
		winchSpeed: 4,
		winchResponsiveness: 0.4,
		duration: 45,
	},
	Weak: {
		length: 5,
		elasticity: 0.4,
		winchPower: 60,
		winchSpeed: 3,
		winchResponsiveness: 0.3,
		duration: 30,
	},
};
