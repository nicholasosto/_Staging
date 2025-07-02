/// <reference types="@rbxts/types" />

/**
 * @file        SettingsService.ts
 * @module      SettingsService
 * @layer       Server/Services
 * @classType   Singleton
 * @description Maintains per-player settings values.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.0
 * @lastUpdated  2025-06-25 by Trembus – Initial creation
 */

// -------------- Imports ----------------------------------------------------- //
import { Players } from "@rbxts/services";
import { DefaultSettings, PlayerSettings, SettingKey } from "shared/definitions/Settings";

// -------------- Service ----------------------------------------------------- //
export class SettingsService {
	private static _instance: SettingsService | undefined;
	private static _settings = new Map<Player, PlayerSettings>();

	private constructor() {
		print("SettingsService initialized.");
	}

	public static Start(): SettingsService {
		if (this._instance === undefined) {
			this._instance = new SettingsService();
		}
		return this._instance;
	}

	public static Get(player: Player): PlayerSettings {
		const existing = this._settings.get(player);
		if (existing) return existing;
		const defaults = { ...DefaultSettings };
		this._settings.set(player, defaults);
		return defaults;
	}

	public static Set(player: Player, key: SettingKey, value: boolean | string) {
		const settings = this.Get(player);
		settings[key] = value;
	}
}

// Start service on import
SettingsService.Start();
