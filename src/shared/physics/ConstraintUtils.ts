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
	rope.Visible = true; // For debugging, remove in production

	if (winchPower > 0) {
		rope.WinchEnabled = true;
		rope.WinchForce = winchPower;
		rope.WinchResponsiveness = opts.winchResponsiveness ?? 0.1; // Default responsiveness
		rope.WinchTarget = opts.length ?? length; // Default to initial length if not specified
		rope.WinchSpeed = opts.winchSpeed ?? 1; // Default winch speed
	}
	register(rope, duration);
	register(a0, duration);
	register(a1, duration);
	return rope;
}
