/// <reference types="@rbxts/types" />

/**
 * @file        ResourceBars.ts                     ◄────── must match filename
 * @module      ResourceBars                        ◄────── public import name
 * @layer       Client/Organisms
 * @description Composite organism that shows the
 *              player's Health, Mana & Stamina.
 *
 * ╭───────────────────────────────────────────────╮
 * │  Soul Steel · Coding Guide                   │
 * │  Fusion v4 · Strict TS · ECS                 │
 * ╰───────────────────────────────────────────────╯
 *
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-06-25 by Luminesa – Comment revamp
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

// -------------- Imports ----------------------------------------------------- //
import Fusion, { New } from "@rbxts/fusion";
import { GamePanel, GameButton } from "client/ui/atoms"; // absolute alias
import { BarMeter } from "client/ui/molecules";
import { PlayerHealth, PlayerMana, PlayerStamina } from "shared/states/PlayerState";
import { Layout, Padding } from "client/ui/tokens";
import { GameImages } from "shared/assets";

// -------------- Design-tokens / theme -------------------------------------- //
const COLORS = {
	HEALTH: Color3.fromRGB(255, 0, 0),
	MANA: Color3.fromRGB(0, 0, 255),
	STAMINA: Color3.fromRGB(0, 255, 0),
};

// -------------- Organism constants ----------------------------------------- //
const ORG = {
	// small object beats 5 globals
	SIZE: UDim2.fromOffset(400, 200),
	POSITION: UDim2.fromScale(0.5, 0.5),
	ANCHOR_POINT: new Vector2(0.5, 0.5),
	BG_TRANSPARENCY: 0.5,
};

const DEBUG = {
	BUTTON_SIZE: UDim2.fromOffset(50, 50),
	CONTAINER_SIZE: UDim2.fromOffset(ORG.SIZE.X.Offset, 50),
};

// -------------- Public factory --------------------------------------------- //
/**
 * Creates the ResourceBars HUD organism.
 *
 * @param debug When `true`, spawns a dev-only toolbar that lets you burn 10
 *              points of each resource to test the UI.
 *              **Tip:** wrap this in an editor-only flag so production
 *              bundles tree-shake the debug code.
 */
export const ResourceBars = (debug = false) => {
	/* ---------- Dev-only controls ----------------------------------------- */
	const DebugPanel = debug
		? GamePanel({
				Name: "ResourceBarsDebug",
				Size: DEBUG.CONTAINER_SIZE,
				Position: UDim2.fromScale(0, 1),
				Layout: Layout.HorizontalSet(5),
				Padding: Padding(2),
				Children: {
					HealthDown: makeDrainButton(GameImages.Attributes.Vitality, PlayerHealth.Current),
					ManaDown: makeDrainButton(GameImages.Attributes.Intelligence, PlayerMana.Current),
					StaminaDown: makeDrainButton(GameImages.Attributes.Dexterity, PlayerStamina.Current),
				},
			})
		: undefined; // ← Nothing is created if debug === false

	/* ---------- Resource bar stack ---------------------------------------- */
	const Bars = GamePanel({
		Name: "ResourceBarsStack",
		Layout: Layout.VerticalSet(5),
		Children: {
			Health: makeBar(PlayerHealth, COLORS.HEALTH),
			Mana: makeBar(PlayerMana, COLORS.MANA),
			Stamina: makeBar(PlayerStamina, COLORS.STAMINA),
		},
	});

	/* ---------- Final organism root --------------------------------------- */
	return GamePanel({
		Name: "ResourceBarsOrganism",
		Size: ORG.SIZE,
		Position: ORG.POSITION,
		AnchorPoint: ORG.ANCHOR_POINT,
		BackgroundTransparency: ORG.BG_TRANSPARENCY,
		DragEnabled: false, // safer default – opt-in later
		Children: {
			DebugPanel, // omitted entirely when undefined
			Bars,
		},
	});
};

// -------------- Local helpers --------------------------------------------- //
function makeBar(state: typeof PlayerHealth, colour: Color3) {
	return BarMeter({
		value: state.Current,
		max: state.Max,
		color: colour,
		Size: UDim2.fromScale(1, 0.3),
	});
}

function makeDrainButton(icon: string, resource: Fusion.Value<number>) {
	return GameButton({
		Image: icon,
		Size: DEBUG.BUTTON_SIZE,
		OnClick: () => resource.set(math.max(0, resource.get() - 10)),
	});
}
