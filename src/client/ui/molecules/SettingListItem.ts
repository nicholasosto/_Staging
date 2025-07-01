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
        const title = GameText({
                Name: "SettingName",
                TextStateValue: Value(meta.displayName),
                TextSize: 16,
                AnchorPoint: new Vector2(0, 0),
                Position: UDim2.fromOffset(0, 0),
                BackgroundTransparency: 1,
                TextXAlignment: Enum.TextXAlignment.Left,
        });

        const description = GameText({
                Name: "SettingDescription",
                TextStateValue: Value(meta.description),
                TextSize: 12,
                AnchorPoint: new Vector2(0, 0),
                Position: UDim2.fromOffset(0, 0),
                BackgroundTransparency: 1,
                TextXAlignment: Enum.TextXAlignment.Left,
        });

        let control: Instance;
        if (meta.controlType === "boolean") {
                const label = Computed(() => ((props.Value.get() as boolean) ? "On" : "Off"));
                control = GameButton({
                        Name: "ToggleButton",
                        Size: UDim2.fromOffset(60, 24),
                        OnClick: () => {
                                const newValue = !(props.Value.get() as boolean);
                                props.Value.set(newValue);
                                props.OnChanged?.(newValue);
                        },
                        [Children]: {
                                Label: GameText({
                                        Name: "ToggleLabel",
                                        TextStateValue: label as unknown as Value<string>,
                                        TextSize: 14,
                                }),
                        },
                });
        } else {
                control = New("TextBox")({
                        Name: "TextInput",
                        Size: UDim2.fromOffset(120, 24),
                        Text: props.Value as Value<string>,
                        BackgroundTransparency: 0.3,
                        [OnChange("Text")]: (txt: string) => {
                                props.Value.set(txt);
                                props.OnChanged?.(txt);
                        },
                });
        }

        return GamePanel({
                Name: props.Name ?? `${props.SettingKey}Item`,
                Size: props.Size ?? UDim2.fromScale(1, 0),
                AutomaticSize: Enum.AutomaticSize.Y,
                Layout: Layout.VerticalSet(2),
                Padding: Padding(4),
                Content: {
                        Title: title,
                        Description: description,
                        Control: control,
                },
        });
};
