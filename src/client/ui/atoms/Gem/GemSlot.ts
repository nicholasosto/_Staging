/// <reference types="@rbxts/types" />

/**
 * @file        GemSlot.ts
 * @module      GemSlot
 * @layer       Client/UI/Atoms
 * @description Clickable inventory gem slot with rarity border and icon.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 *
 * @author       Codex
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-01 by Codex – Initial creation
 *
 * @dependencies
 *   @rbxts/fusion ^0.4.0
 */
// #AGENT_ATOM
import Fusion, { Children, New, OnEvent, PropertyTable } from "@rbxts/fusion";
import { GameImages } from "shared/assets";
import { BorderImage } from "../Image";
import { GameImage } from "../Image/GameImage";
import { RarityKey } from "shared/data";

export interface GemSlotProps extends PropertyTable<ImageButton> {
        Icon?: string;
        Rarity?: RarityKey;
        OnClick?: () => void;
}

export function GemSlot(props: GemSlotProps) {
        const border = () => {
                switch (props.Rarity) {
                        case "Rare":
                                return BorderImage.RareRarity();
                        case "Epic":
                                return BorderImage.EpicRarity();
                        case "Legendary":
                                return BorderImage.LegendaryRarity();
                        default:
                                return BorderImage.GothicMetal();
                }
        };
        return New("ImageButton")({
                Name: props.Name ?? "GemSlot",
                Size: props.Size ?? UDim2.fromOffset(70, 70),
                BackgroundTransparency: 1,
                ImageTransparency: 1,
                [OnEvent("Activated")]: () => props.OnClick && props.OnClick(),
                [Children]: {
                        Border: border(),
                        Icon: GameImage({
                                Image: props.Icon ?? GameImages.Gems.Colorable,
                                Size: UDim2.fromScale(0.8, 0.8),
                                Position: UDim2.fromScale(0.5, 0.5),
                                AnchorPoint: new Vector2(0.5, 0.5),
                        }),
                },
        });
}
