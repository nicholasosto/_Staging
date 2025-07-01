/// <reference types="@rbxts/types" />

/**
 * @file        SettingsState.ts
 * @module      SettingsState
 * @layer       Client
 * @description Reactive container for player settings.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

import Fusion, { Value } from "@rbxts/fusion";
import { DefaultSettings, PlayerSettings, SETTING_KEYS, SettingKey } from "shared/definitions/Settings";
import { GetPlayerSettings } from "client/network/CallServer";

export default class SettingsState {
	private static instance: SettingsState;
	public Settings: Record<SettingKey, Value<boolean | string>> = {} as never;

	private constructor() {
		for (const key of SETTING_KEYS) {
			this.Settings[key] = Value(DefaultSettings[key]);
		}
		this.fetchFromServer();
	}

	private async fetchFromServer() {
		const data = await GetPlayerSettings();
		if (data) {
			for (const key of SETTING_KEYS) {
				const val = data[key];
				this.Settings[key].set(val);
			}
		}
	}

	public static getInstance(): SettingsState {
		if (!this.instance) {
			this.instance = new SettingsState();
		}
		return this.instance;
	}

	public set(key: SettingKey, value: boolean | string) {
		this.Settings[key].set(value);
	}
}
