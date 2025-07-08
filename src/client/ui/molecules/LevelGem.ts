/// <reference types="@rbxts/types" />

/**
 * @file        LevelGem.ts
 * @module      LevelGem
 * @layer       Client/UI/Molecules
 * @description Displays the player's current level as a gem icon.
 */

import { GameImage, BaseContainer, GameText } from "../atoms";
import { GameImages } from "shared/assets";
import { Value, Observer } from "@rbxts/fusion";
import ProgressionSlice from "client/states/ProgressionSlice";

export function LevelGem() {
	const level = ProgressionSlice.getInstance().Progression.Level;
	const labelValue = Value(`Lv ${level.get()}`);
	Observer(level).onChange(() => {
		labelValue.set(`Lv ${level.get()}`);
	});

       return BaseContainer({
               Name: "LevelGem",
		Size: new UDim2(0, 60, 0, 60),
		BackgroundTransparency: 1,
		Content: {
			Icon: GameImage({
				Image: GameImages.Gems.Epic,
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
			}),
			Label: GameText({
				TextStateValue: labelValue,
				Size: UDim2.fromScale(1, 0.3),
				Position: UDim2.fromScale(0, 0.7),
				BackgroundTransparency: 1,
			}),
		},
	});
}
