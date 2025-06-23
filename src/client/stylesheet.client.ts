/// <reference types="@rbxts/types" />

/**
 * @file        stylesheet.client.ts
 * @module      StylesheetClient
 * @layer       Client
 * @description Prototype stylesheet setup for testing StyleSheet service.
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

/* =============================================== Imports =============================================== */
import { Players, ReplicatedStorage, CollectionService } from "@rbxts/services";

/* =============================================== Token Sheet =============================================== */

function makeTokenSheet() {
	const tokens = new Instance("StyleSheet");
	tokens.Name = "TokenSheet";
	tokens.Parent = ReplicatedStorage;

	// colour + size + font tokens
	tokens.SetAttribute("Primary", Color3.fromHex("FF0099"));
	tokens.SetAttribute("SquareL", new UDim2(0, 200, 0, 200));
	tokens.SetAttribute("Oswald", Font.fromName("Oswald"));
	return tokens;
}

/* =============================================== Design Sheet =============================================== */
function makeDesignSheet(tokens: StyleSheet) {
	const design = new Instance("StyleSheet");
	design.Name = "DesignSheet";
	design.Parent = ReplicatedStorage;

	// inherit the tokens
	const derive = new Instance("StyleDerive");
	derive.StyleSheet = tokens;
	derive.Parent = design;

	// class selector: all Frames
	const allFrames = new Instance("StyleRule");
	allFrames.Parent = design;
	allFrames.Selector = "Frame";
	allFrames.SetProperties({
		BackgroundColor3: "$Primary",
		Size: "$SquareL",
		BorderSizePixel: 3,
	});

	// tag selector: .ButtonPrimary (TextButton)
	const primaryBtn = new Instance("StyleRule");
	primaryBtn.Parent = design;
	primaryBtn.Selector = ".ButtonPrimary";
	primaryBtn.SetProperties({
		BackgroundColor3: "$Primary",
		FontFace: "$Oswald",
		TextSize: 32,
		BorderSizePixel: 0,
	});

	return design;
}

/* =============================================== Link Setup =============================================== */
const tokens = makeTokenSheet();
const design = makeDesignSheet(tokens);

// link once per GUI tree
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
const gui = playerGui.WaitForChild("StyleSheet") as ScreenGui;
const link = new Instance("StyleLink");
link.StyleSheet = design;
link.Parent = gui;
