/**
 * @file src/shared/types/SSEntity.ts
 * @module SSEntity
 * @layer Shared/Types
 * @description Defines the structure for a targetable entity in the game.
 * * ╭──────────────────────────────╮
 * * │  Soul Steel · Coding Guide   │
 * * │  Fusion v4 · Strict TS · ECS │
 * * ╰──────────────────────────────╯
 * * @author       Trembus
 * * @license      MIT
 * * @since        0.1.0
 * * @lastUpdated  2025-07-11 by Trembus – Initial creation
 * * @dependencies
 *  @rbxts/types
 *
 */

import { CharacterAttachments } from "./CharacterAttachments";

export type SSEntity = Model & {
	PrimartyPart: BasePart;
	Humanoid: Humanoid;
	HumanoidRootPart: BasePart;
	Attachments?: CharacterAttachments;
};
