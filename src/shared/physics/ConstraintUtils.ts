/// <reference types="@rbxts/types" />

/**
 * @file        ConstraintUtils.ts
 * @module      ConstraintUtils
 * @layer       Shared/Physics
 * @description Helpers for creating temporary constraints.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { register } from "./internal/Cleanup";
import { RopeOptions } from "./physics.types";

/**
 * Creates a RopeConstraint linking `source` and `parent`.
 *
 * @param source - Part containing Attachment0
 * @param parent - Part containing Attachment1
 * @param opts - Partial rope configuration
 * @returns The created RopeConstraint
 */
export function createRope(source: BasePart, parent: BasePart, opts: Partial<RopeOptions> = {}) {
	const { length, elasticity, winchPower, duration } = {
		length: 10,
		elasticity: 0.25,
		winchPower: 0,
		...opts,
	};

	const a0 = new Instance("Attachment");
	a0.Parent = source;
	const a1 = new Instance("Attachment");
	a1.Parent = parent;

	const rope = new Instance("RopeConstraint");
	rope.Attachment0 = a0;
	rope.Attachment1 = a1;
	rope.Length = length;
	rope.Restitution = elasticity;
	rope.Parent = source;

	if (winchPower && winchPower !== 0) {
		rope.WinchEnabled = true;
		rope.WinchForce = winchPower;
		rope.WinchResponsiveness = 100;
	}

	register(rope, duration);
	register(a0, duration);
	register(a1, duration);
	return rope;
}
