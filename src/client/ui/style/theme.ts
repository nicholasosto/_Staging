/// <reference types="@rbxts/types" />

import { Value } from "@rbxts/fusion";
import { BorderImage } from "../atoms";
import { SoundService } from "@rbxts/services";

/**
 * @file        theme.ts
 * @module      Theme
 * @layer       Client/Style
 * @description Shared color palette and theme tokens.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

/* =============================================== Color Tokens ================================ */

export const StrokeColors = {
	ZombieTheme: {
		StrokeDefault: new Color3(0.11, 0, 0),
		StrokeHover: new Color3(0.24, 0.13, 0.01),
	},
	RobotTheme: {
		StrokeDefault: new Color3(0.11, 0, 0),
		StrokeHover: new Color3(0.24, 0.13, 0.01),
	},
};

export const TextColors = {
	ZombieTheme: {
		TextDefault: new Color3(0.65, 0.99, 0.09),
		TextStroke: new Color3(0.11, 0, 0),
		TextHover: new Color3(1, 1, 1),
		TextDisabled: new Color3(0.5, 0.5, 0.5),
	},
	RobotTheme: {
		TextDefault: new Color3(1, 1, 1),
		TextStroke: new Color3(0.11, 0, 0),
		TextHover: new Color3(1, 1, 1),
		TextDisabled: new Color3(0.5, 0.5, 0.5),
	},
};

export const PanelBackgroundColors = {
	ZombieTheme: {
		BackgroundColor: new Color3(0, 0.08, 0.01),
		BackgroundHoverColor: new Color3(0.04, 0.47, 0.38),
	},
	RobotTheme: {
		BackgroundColor: new Color3(0.1, 0.1, 0.1),
		BackgroundHoverColor: new Color3(0.2, 0.2, 0.2),
	},
};

export const FillbarColors = {
	ZombieTheme: {
		Health: new Color3(0.02, 0.16, 0.12),
		Mana: new Color3(0.16, 0.93, 0.36),
		Stamina: new Color3(0.15, 0.18, 0.01),
	},
	RobotTheme: {
		Health: new Color3(0.41, 0.12, 0.4),
		Mana: new Color3(0.1, 0.1, 0.8),
		Stamina: new Color3(0.1, 0.8, 0.1),
	},
};

/* ================================================ Text Tokens ================================ */
export const TextTokens = {
	ZombieTheme: {

		Font: Font.fromName("Oswald", Enum.FontWeight.Regular, Enum.FontStyle.Normal),
		FontHover: Font.fromName("LuckiestGuy", Enum.FontWeight.Bold, Enum.FontStyle.Italic),
		TextHoverColor: TextColors.ZombieTheme.TextHover,
		TextDisabledColor: TextColors.ZombieTheme.TextDisabled,
		TextDefaultColor: new Color3(0.65, 0.99, 0.09),
		TextStrokeColor: new Color3(0.11, 0, 0),
		TextHover: new Color3(1, 1, 1),
		TextDisabled: new Color3(0.5, 0.5, 0.5),
	},
	RobotTheme: {
		Font: Font.fromName("Oswald", Enum.FontWeight.Regular, Enum.FontStyle.Normal),
		FontHover: Font.fromName("LuckiestGuy", Enum.FontWeight.Bold, Enum.FontStyle.Italic),
	},
};

/* ================================================ Audio Tokens ================================ */
export const AudioTokens = {
	ZombieTheme: {
		BackgroundMusic: (new Instance("Sound").SoundId = "rbxassetid://123456"), // Replace with actual asset ID
		SuccessClick: (new Instance("Sound").SoundId = "rbxassetid://123456"),
		ErrorClick: (new Instance("Sound").SoundId = "rbxassetid://123456"),
		Damaged: (new Instance("Sound").SoundId = "rbxassetid://123456"),
	},
	RobotTheme: {
		BackgroundMusic: (new Instance("Sound").SoundId = "rbxassetid://123456"), // Replace with actual asset ID
		SuccessClick: (new Instance("Sound").SoundId = "rbxassetid://123456"),
		ErrorClick: (new Instance("Sound").SoundId = "rbxassetid://123456"),
		Damaged: (new Instance("Sound").SoundId = "rbxassetid://123456"),
	},
};

/* =============================================== Font Tokens ================================ */
export const FontTokens = {
	ZombieTheme: {
		Font: Font.fromName("Oswald"),
	},
	RobotTheme: {
		Font: Font.fromName("Oswald"),
	},
};

/* =============================================== Image Tokens ================================ */
export const ImageTokens = {
	ZombieTheme: {
		BorderImage: BorderImage.GothicMetal(),
	},
	RobotTheme: {
		BorderImage: BorderImage.RedThick(),
	},
};

/* =============================================== Theme State ============================= */
export const THEME_KEYS = ["ROBOT", "ZOMBIE"] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

export interface ThemeProps {
	TextTheme: {
		Font: Value<Font>;
		TextColor: Value<Color3>;
		TextHoverColor: Value<Color3>;
		TextDisabledColor: Value<Color3>;
	};

	PanelTheme: {
		BackgroundColor: Value<Color3>;
		BackgroundHoverColor: Value<Color3>;
		StrokeColor: Value<Color3>;
	};

	ResourceBars: {
		BorderImage: Value<ImageLabel>;
		HealthBarColor: Value<Color3>;
		StaminaBarColor: Value<Color3>;
		ManaBarColor: Value<Color3>;
	};

	Audio: {
		BackgroundMusic: Value<Sound>;
		SuccessClick: Value<Sound>;
		ErrorClick: Value<Sound>;
		Damaged: Value<Sound>;
	};
}
