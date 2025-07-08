/// <reference types="@rbxts/types" />

/**
 * @file        StateBag.ts
 * @module      StateBag
 * @layer       Client/State
 * @description Convenience wrapper bundling commonly accessed state slices.
 *
 * @since        0.1.0
 * @lastUpdated  2025-07-10 by Codex – Added header
 * @author       Codex
 * @license      MIT
 */

import PlayerState from "./PlayerState";
import ProgressionSlice from "./ProgressionSlice";

const playerState = PlayerState.getInstance();

export class StateBag {
	/** Player state instance */
	public static PlayerState = playerState;
	public static ProgressionState = ProgressionSlice.getInstance();
}
