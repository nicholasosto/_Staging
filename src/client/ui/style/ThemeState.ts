/// <reference types="@rbxts/types" />

/**
 * @file        ThemeState.ts
 * @module      ThemeState
 * @layer       Client/Style
 * @description Centralized theme values for UI.
 */

/* =============================================== Imports =============================================== */
import Fusion, { Value } from "@rbxts/fusion";

export const ThemeState = {
	FrameTransparency: Value(0.8),
	BackgroundColor3: Value(Color3.fromRGB(30, 30, 30)),
	//DefualtFont: Value(Font.fromName("Luckiest Guy")),
};

export const GameColors = {
	StrokeHover: new Color3(0.24, 0.13, 0.01),
	StrokeDefault: new Color3(0.11, 0, 0),
	TextDefault: new Color3(1, 1, 1),
	BackgroundDefault: new Color3(0.1, 0.1, 0.1),
	BackgroundHover: new Color3(0.2, 0.2, 0.2),
	GradientStart: new Color3(0.2, 0.2, 0.2),
	GradientEnd: new Color3(0.1, 0.1, 0.1),
	TextHover: new Color3(1, 1, 1),
	TextDisabled: new Color3(0.5, 0.5, 0.5),
	ButtonBackground: new Color3(0.2, 0.2, 0.2),
	ButtonBackgroundHover: new Color3(0.79, 0.1, 0.1),
	ButtonText: new Color3(1, 1, 1),
	ButtonTextHover: new Color3(1, 1, 1),
	ScrollBar: new Color3(0.3, 0.3, 0.3),
};
