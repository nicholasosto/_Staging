/// <reference types="@rbxts/types" />

/**
 * @file        SettingListItem.ts
 * @module      SettingListItem
 * @layer       Client/UI/Molecules
 * @description Theme-aware list item for modifying a player setting.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

// -------------- Imports ----------------------------------------------------- //
import Fusion, { Children, Computed, New, OnChange, OnEvent, Value } from "@rbxts/fusion";
import { GamePanel, GameButton, GameText } from "client/ui/atoms";
import { Layout, Padding } from "client/ui/tokens";
import { SettingKey, SettingsMeta } from "shared/definitions/ProfileDefinitions/Settings";

// -------------- Props ------------------------------------------------------- //
export interface SettingListItemProps extends Fusion.PropertyTable<Frame> {
	SettingKey: SettingKey;
	Value: Value<boolean | string>;
	OnChanged?: (value: boolean | string) => void;
}

// -------------- Component --------------------------------------------------- //
export const SettingListItem = (props: SettingListItemProps) => {
	const meta = SettingsMeta[props.SettingKey];
	const ContainerSize = new UDim2(1, 0, 0, 50);

	const newContainer = GamePanel({
		Name: "SettingListItemContainer",
		Size: props.Size ?? ContainerSize,
		Layout: Layout.HorizontalSet(2),
		Padding: Padding(4),
		Content: {
			Title: GameText({
				Name: "SettingTitle",
				TextStateValue: Value(meta.displayName),
				TextSize: 14,
				Size: UDim2.fromScale(0.4, 1),
				BackgroundTransparency: 1,
				LayoutOrder: 1,
				TextXAlignment: Enum.TextXAlignment.Left,
			}),
			Control: GameButton({
				Name: "SettingControl",
				Size: UDim2.fromScale(0.6, 1),
				BackgroundTransparency: 0.3,
				LayoutOrder: 2,
				OnClick: () => {
					print("SettingControl Clicked", props.SettingKey, props.Value.get());
					if (meta.controlType === "boolean") {
						const newValue = !(props.Value.get() as boolean);
						props.Value.set(newValue);
						props.OnChanged?.(newValue);
					} else if (meta.controlType === "string") {
						// Handle string input, e.g., open a text input dialog
						const newValue = "New Value"; // Placeholder for actual input logic
						props.Value.set(newValue);
						props.OnChanged?.(newValue);
					}
				},
			}),
		},
	});

	let control: Instance;
	// if (meta.controlType === "boolean") {
	// 	const label = Computed(() => ((props.Value.get() as boolean) ? "On" : "Off"));
	// 	control = GameButton({
	// 		Name: "ToggleButton",
	// 		Size: UDim2.fromOffset(60, 24),
	// 		OnClick: () => {
	// 			const newValue = !(props.Value.get() as boolean);
	// 			props.Value.set(newValue);
	// 			props.OnChanged?.(newValue);
	// 		},
	// 		[Children]: {
	// 			Label: GameText({
	// 				Name: "ToggleLabel",
	// 				TextStateValue: label as unknown as Value<string>,
	// 				TextSize: 14,
	// 			}),
	// 		},
	// 	});
	// } else {
	// 	control = New("TextBox")({
	// 		Name: "TextInput",
	// 		Size: UDim2.fromOffset(120, 24),
	// 		Text: props.Value as Value<string>,
	// 		BackgroundTransparency: 0.3,
	// 		[OnChange("Text")]: (txt: string) => {
	// 			props.Value.set(txt);
	// 			props.OnChanged?.(txt);
	// 		},
	// 	});
	// }
	return newContainer;
};
