/// <reference types="@rbxts/types" />

/**
 * @file        ForceUtils.ts
 * @module      ForceUtils
 * @layer       Shared/Physics
 * @description Helpers for applying directional forces between parts.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import { RunService } from "@rbxts/services";
import { register } from "./internal/Cleanup";
import { ForceOptions } from "./physics.types";

function applyVectorForce(source: BasePart, target: BasePart, direction: "push" | "pull", opts: Partial<ForceOptions>) {
	const { magnitude, duration, inverseSquare } = {
		magnitude: 100,
		inverseSquare: false,
		...opts,
	};

	const attachment = new Instance("Attachment");
	attachment.Parent = target;

	const force = new Instance("VectorForce");
	force.ApplyAtCenterOfMass = true;
	force.Attachment0 = attachment;
	force.Parent = target;

	const update = () => {
		const offset = target.Position.sub(source.Position);
		const dir = direction === "push" ? offset.Unit : offset.Unit.mul(-1);
		let mag = magnitude;
		if (inverseSquare) {
			const distSq = math.max(offset.Magnitude ** 2, 1);
			mag = magnitude / distSq;
		}
		force.Force = dir.mul(mag);
	};

	update();
	const conn = RunService.Heartbeat.Connect(update);

	register(force, duration);
	register(attachment, duration);
	if (duration !== undefined) {
		task.delay(duration, () => conn.Disconnect());
	}
}

/**
 * Pushes `target` away from `source` using a VectorForce.
 *
 * @param source - The origin part
 * @param target - The part to push
 * @param opts - Optional force configuration
 */
export const PushAwayFrom = (source: BasePart, target: BasePart, opts: Partial<ForceOptions> = {}) =>
	applyVectorForce(source, target, "push", opts);

/**
 * Attracts `target` toward `source` using a VectorForce.
 *
 * @param source - The origin part
 * @param target - The part to pull
 * @param opts - Optional force configuration
 */
export const Attract = (source: BasePart, target: BasePart, opts: Partial<ForceOptions> = {}) =>
	applyVectorForce(source, target, "pull", opts);
