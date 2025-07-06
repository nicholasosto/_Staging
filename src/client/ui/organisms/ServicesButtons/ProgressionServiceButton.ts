/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionServiceButton.ts
 * @module      ProgressionServiceButton
 * @layer       Client/UI/Organisms
 * @description Button for invoking ProgressionService test actions.
 */

import { GameButton } from "client/ui/atoms";
import { AddExperience } from "client/network/ClientNetworkService";

export const ProgressionServiceButton = () =>
        GameButton({
                Name: "ProgressionServiceButton",
                Size: new UDim2(0, 120, 0, 40),
                Image: "rbxassetid://8672979592",
                Label: "+10 XP",
                OnClick: () => {
                        AddExperience(10);
                },
        });
