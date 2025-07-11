/// <reference types="@rbxts/types" />

/**
 * @file        ConstrictorBeam.ts
 * @module      ConstrictorBeam
 * @layer       Shared/Physics
 * @description Convenience wrapper around `spawnConstrictorBeam` for snake-like beams.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @example
 * ```ts
 * const handle = ConstrictorBeam(
 *     casterAttachment,
 *     victimAttachment,
 *     { durationSeconds: 3, tension: 0.4, stiffness: 0.8 },
 * );
 * enemy.Died.Connect(() => handle.destroy());
 * ```
 */

import { PhysicsBeamOptions, PhysicsBeamHandle, spawnConstrictorBeam } from "./PhysicsBeamService";

export type ConstrictorBeamOptions = PhysicsBeamOptions;

/** Spawns a constrictor-style physics beam. */
export function ConstrictorBeam(
	startAttachment: Attachment,
	endAttachment: Attachment,
	opts?: ConstrictorBeamOptions,
): PhysicsBeamHandle {
	return spawnConstrictorBeam(startAttachment, endAttachment, opts);
}
