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
import { SettingKey, SettingsMeta } from "shared/definitions/Settings";

// -------------- Props ------------------------------------------------------- //
export interface SettingListItemProps extends Fusion.PropertyTable<Frame> {
	SettingKey: SettingKey;
	Value: Value<boolean | string>;
	OnChanged?: (value: boolean | string) => void;
}

// -------------- Component --------------------------------------------------- //
export const SettingListItem = (props: SettingListItemProps) => {
	const meta = SettingsMeta[props.SettingKey];

	const newContainer = GamePanel({
		Name: "SettingListItemContainer",
		Size: props.Size ?? UDim2.fromScale(1, 0),
		Layout: Layout.HorizontalSet(2),
		Padding: Padding(4),
		BackgroundColor3: Color3.fromRGB(30, 30, 30),
		BorderSizePixel: 0,
		[OnEvent("MouseEnter")]: () => {
			newContainer.BackgroundColor3 = Color3.fromRGB(40, 40, 40);
		},
		[OnEvent("MouseLeave")]: () => {
			newContainer.BackgroundColor3 = Color3.fromRGB(30, 30, 30);
		},

		Content: {
			Title: GameText({
				Name: "SettingName",
				TextStateValue: Value(meta.displayName),
				TextSize: 16,
				Size: UDim2.fromOffset(0.3, 1),
				BackgroundTransparency: 1,
				TextXAlignment: Enum.TextXAlignment.Left,
			}),
			Description: GameText({
				Name: "SettingDescription",
				TextStateValue: Value(meta.description),
				TextSize: 12,
				Size: UDim2.fromOffset(0.3, 1),
				BackgroundTransparency: 1,
				TextXAlignment: Enum.TextXAlignment.Center,
			}),
			Control: GameText({
				Name: "SettingControl",
				TextStateValue: Value(meta.controlType),
				TextSize: 12,
				Size: UDim2.fromOffset(0.3, 1),
				BackgroundTransparency: 1,
				TextXAlignment: Enum.TextXAlignment.Center,
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
