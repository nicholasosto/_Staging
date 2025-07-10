/**
 * StateDebugPanel.ts
 * @module      StateDebugPanel
 * @layer       Client/Organisms
 * @description Displays the current state of the player's resources for debugging.
 * ╭──────────────────────────────╮
 * │  Soul Steel · Coding Guide   │
 *
 * │  Fusion v4 · Strict TS · ECS │
 * ╰──────────────────────────────╯
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-10 by Trembus – Initial creation
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */

import Fusion, { Computed, Value } from "@rbxts/fusion";
import { PlayerStateInstance } from "client/states/PlayerState";

import { BaseContainer, GameText, ListContainer } from "client/ui/atoms";

export interface StateDebugPanelProps {
	Value1: Value<string> | Value<number>;
	Value2: Value<string> | Value<number>;
	Value3: Value<string> | Value<number>;
	Computed1: Computed<string> | Computed<number>;
	Computed2: Computed<string> | Computed<number>;
	Computed3: Computed<string> | Computed<number>;
	Observer1: (value: string | number) => void;
	Observer2: (value: string | number) => void;
	Observer3: (value: string | number) => void;
}

function CreateInfoRow(state: Value<string> | Value<number>, label: string) {
	const Label = GameText({
		Size: UDim2.fromScale(0.3, 1),
		Name: `${label}_Label`,
		TextState: Value(label),
	});

	const ValueContent = GameText({
		Size: UDim2.fromScale(0.7, 1),
		Name: `${label}_Value`,
		TextState: state,
	});

	return ListContainer({
		Name: `${label}_Row`,
		Size: UDim2.fromScale(1, 0.1),
		LayoutOrientation: "horizontal",
		Content: {
			Label: Label,
			Value: ValueContent,
		},
	});
}

export const StateDebugPanel = (props: Partial<StateDebugPanelProps>) => {
	const resourceState = PlayerStateInstance.Resources;
	const HealthRow = CreateInfoRow(resourceState.Health.current, "Health");
	const ManaRow = CreateInfoRow(resourceState.Mana.current, "Mana");
	const StaminaRow = CreateInfoRow(resourceState.Stamina.current, "Stamina");

	const Container = ListContainer({
		Name: "StateDebugPanel",
		Size: UDim2.fromScale(1, 0.3),
		LayoutOrientation: "vertical",
		LayoutOrder: 1,
		FlexMode: "Shrink",
		Gap: 0.5,
		Content: {
			HealthRow: HealthRow,
			ManaRow: ManaRow,
			StaminaRow: StaminaRow,
		},
	});
	return Container;
};
