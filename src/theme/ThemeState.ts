/// <reference types="@rbxts/types" />

/**
 * @file        ThemeState.ts
 * @module      ThemeState
 * @layer       Client
 * @description Reactive theme store powered by Fusion.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion from "@rbxts/fusion";
import { ThemeKey, DEFAULT_THEME } from "./ThemeKey";
import { cyberGothic } from "./tokens/cyberGothic";
import { solarDrift } from "./tokens/solarDrift";
import { ThemeTokens } from "./types";

const { Value, Computed } = Fusion;

const themeKey = Value<ThemeKey>(DEFAULT_THEME);

const themeMap: Record<ThemeKey, ThemeTokens> = {
	[ThemeKey.CyberGothic]: cyberGothic,
	[ThemeKey.SolarDrift]: solarDrift,
};

const currentTokens = Computed(() => themeMap[themeKey.get()]);

export const ThemeState = {
	set: (key: ThemeKey) => themeKey.set(key),
	key: themeKey,
	tokens: currentTokens,
};
