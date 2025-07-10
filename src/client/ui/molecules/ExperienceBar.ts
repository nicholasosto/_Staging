/// <reference types="@rbxts/types" />

/**
 * @file        ExperienceBar.ts
 * @module      ExperienceBar
 * @layer       Client/UI/Molecules
 * @description Horizontal bar displaying current experience progress.
 */

import Fusion, { Computed, Observer } from "@rbxts/fusion";
import { ProgressBar } from "./ProgressBar";
import { PlayerStateInstance } from "client/states/PlayerState";
import { Gradients } from "shared/constants/gradients";
import { getNextLevelExperience } from "shared/definitions/ProfileDefinitions/Progression";
import { createAudio } from "shared/assets/audio";
import { TweenService } from "@rbxts/services";

const ProgressionSlice = PlayerStateInstance.Progression;

export function ExperienceBar() {
	const slice = ProgressionSlice;
	const level = slice.Progression.Level;
	const experience = slice.Progression.Experience;

	const percent = Computed(() => {
		const lvl = level.get();
		const exp = experience.get();
		const nextExp = getNextLevelExperience(lvl);
		slice.NextLevelExperience.set(nextExp);
		return exp / math.max(nextExp, 1);
	});

	const bar = ProgressBar({
		Percent: percent,
		Label: Computed(() => `Level ${level.get()} - ${math.floor(percent.get() * 100)}%`),
	});

	const glowTweenInfo = new TweenInfo(0.4, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);
	const stroke = bar.FindFirstChildWhichIsA("UIStroke");
	const sound = createAudio("RobotTheme", "LevelUp");
	sound.Parent = bar;

	/* -- Level Change Observer -- */
	Observer(level).onChange(() => {
		sound.Play();
		if (stroke) {
			stroke.Transparency = 1;
			const t = TweenService.Create(stroke, glowTweenInfo, { Transparency: 0 });
			t.Play();
			t.Completed.Once(() => {
				TweenService.Create(stroke, glowTweenInfo, { Transparency: 1 }).Play();
			});
		}
	});

	/* -- Experience Change Observer -- */
	Observer(experience).onChange(() => {
		print("Experience changed to", experience.get());
		if (stroke) {
			stroke.Transparency = 1;
			const t = TweenService.Create(stroke, glowTweenInfo, { Transparency: 0 });
			t.Play();
			t.Completed.Once(() => {
				TweenService.Create(stroke, glowTweenInfo, { Transparency: 1 }).Play();
			});
		}
	});

	return bar;
}
