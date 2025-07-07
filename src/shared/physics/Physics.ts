/// <reference types="@rbxts/types" />

/**
 * @file        Physics.ts
 * @module      PhysicsFacade
 * @layer       Shared/Physics
 * @description Public API re-exporting physics helpers.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

export * from "./ForceUtils";
export { createRope as CreateRope } from "./ConstraintUtils";
