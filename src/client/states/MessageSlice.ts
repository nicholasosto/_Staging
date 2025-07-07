/// <reference types="@rbxts/types" />

/**
 * @file        MessageSlice.ts
 * @module      MessageSlice
 * @layer       Client/State
 * @description Reactive container for transient user messages.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-06 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion from "@rbxts/fusion";

const { Value } = Fusion;

export default class MessageSlice {
	private static instance: MessageSlice;

	public readonly Text = Value("");
	public readonly Visible = Value(false);
	public readonly IsError = Value(false);

	private constructor() {}

	public show(text: string, isError = false, duration = 2) {
		this.Text.set(text);
		this.IsError.set(isError);
		this.Visible.set(true);
		task.delay(duration, () => {
			this.Visible.set(false);
		});
	}

	public static getInstance(): MessageSlice {
		if (!this.instance) {
			this.instance = new MessageSlice();
		}
		return this.instance;
	}
}
