/// <reference types="@rbxts/types" />

/**
 * @file        PhysicsBeamService.ts
 * @module      PhysicsBeamService
 * @layer       Shared/Physics
 * @description Spawns physics constraints that mirror a visual Beam and optionally apply forces.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Maid from "@rbxts/maid";
import { RunService } from "@rbxts/services";

export interface PhysicsBeamOptions {
	/** Seconds before automatic teardown (∞ if undefined). */
	durationSeconds?: number;
	/** Fraction [0‒1] of length to subtract while constricting. */
	tension?: number;
	/** Spring stiffness (0‒1) applied to the generated SpringConstraint. */
	stiffness?: number;
}

export interface PhysicsBeamHandle {
	/** Manually removes constraints & disconnects events. Safe to call multiple times. */
	destroy(): void;
}

function createSpring(a0: Attachment, a1: Attachment, stiffness: number): SpringConstraint {
	const spring = new Instance("SpringConstraint");
	spring.Attachment0 = a0;
	spring.Attachment1 = a1;
	spring.Stiffness = math.clamp(stiffness, 0, 1) * 100;
	spring.Damping = 0.5;
	spring.Parent = a0.Parent;
	return spring;
}

function createPrismatic(a0: Attachment, a1: Attachment, length: number): PrismaticConstraint {
	const prism = new Instance("PrismaticConstraint");
	prism.Attachment0 = a0;
	prism.Attachment1 = a1;
	prism.LimitsEnabled = true;
	prism.LowerLimit = 0;
	prism.UpperLimit = length;
	prism.Parent = a0.Parent;
	return prism;
}

/**
 * Spawns physics constraints that track an existing Beam’s endpoints.
 * Constraints use the *same* Attachments passed in.
 *
 * @example
 * const handle = spawnConstrictorBeam(a0, a1, { durationSeconds: 2, tension: 0.4 });
 * task.delay(1, () => handle.destroy());
 */
export function spawnConstrictorBeam(
	startAttachment: Attachment,
	endAttachment: Attachment,
	opts: PhysicsBeamOptions = {},
): PhysicsBeamHandle {
	const { durationSeconds, tension = 0.3, stiffness = 0.5 } = opts;

	const maid = new Maid();
	const length = startAttachment.WorldPosition.sub(endAttachment.WorldPosition).Magnitude;

	const spring = createSpring(startAttachment, endAttachment, stiffness);
	const prism = createPrismatic(startAttachment, endAttachment, length);

	maid.GiveTask(spring);
	maid.GiveTask(prism);

	let elapsed = 0;
	const connection = RunService.Heartbeat.Connect((dt) => {
		elapsed += dt;

		if (!startAttachment.Parent || !endAttachment.Parent) {
			handle.destroy();
			return;
		}

		const ratio = durationSeconds ? math.clamp(elapsed / durationSeconds, 0, 1) : 0;
		prism.UpperLimit = length * (1 - tension * ratio);

		if (durationSeconds && elapsed >= durationSeconds) {
			handle.destroy();
		}
	});
	maid.GiveTask(connection);

	const handle: PhysicsBeamHandle = {
		destroy() {
			connection.Disconnect();
			maid.DoCleaning();
		},
	};

	return handle;
}
