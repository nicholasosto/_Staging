/// <reference types="@rbxts/types" />

/**
 * @file        ProgressionCard.ts
 * @module      ProgressionCard
 * @layer       Client/Organisms
 * @description Displays level gem and experience bar together.
 */

import { GamePanel } from "../atoms";
import { Layout } from "../tokens";
import { LevelGem } from "../molecules/LevelGem";
import { ExperienceBar } from "../molecules/ExperienceBar";

export const ProgressionCard = (layoutOrder?: number) => {
	return GamePanel({
		Name: "ProgressionCard",
		Size: new UDim2(0, 250, 0, 70),
		Layout: Layout.HorizontalSet(5),
		LayoutOrder: layoutOrder,
		BackgroundTransparency: 0.5,
		Content: {
			Level: LevelGem(),
			XP: ExperienceBar(),
		},
	});
};
