/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionCard.ts
 * @module      ProgressionCard
 * @layer       Client/Organisms
 * @description Displays level gem and experience bar together.
 */

import { ListContainer } from "../atoms";
import { LevelGem } from "../molecules/LevelGem";
import { ExperienceBar } from "../molecules/ExperienceBar";

export const ProgressionCard = (layoutOrder?: number) => {
	return ListContainer({
		Name: "ProgressionCard",
		Size: new UDim2(0, 250, 0, 70),
		LayoutOrientation: "horizontal",
		Gap: 5,
		LayoutOrder: layoutOrder,
		BackgroundTransparency: 0.5,
		Content: {
			Level: LevelGem(),
			XP: ExperienceBar(),
		},
	});
};
