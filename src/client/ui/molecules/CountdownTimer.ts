/// <reference types="@rbxts/types" />

/**
 * @file        CountdownTimer.ts
 * @module      CountdownTimer
 * @layer       Client/UI/Molecules
 * @description Displays a stylized countdown value for battle rooms.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-02 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Computed, Value } from "@rbxts/fusion";
import { GameText } from "../atoms";

export interface CountdownTimerProps {
	remaining: Fusion.Value<number>;
}

export function CountdownTimer(props: CountdownTimerProps) {
	const text = Computed(() => `Battle starts in: ${props.remaining.get()}s`);
	return GameText({
		Name: "CountdownTimer",
		TextState: Value(text.get()),
		TextSize: 28,
	});
}
