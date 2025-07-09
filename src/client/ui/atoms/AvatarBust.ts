/**
 * @file        AvatarBust.ts
 * @module      AvatarBust
 * @layer       Client/UI/Molecules
 * @description Displays a player's avatar bust image.
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 * @author       Trembus
 * @license      MIT
 * @since        0.2.1
 * @lastUpdated  2025-07-09 by Trembus – Initial creation
 */

import { Players } from "@rbxts/services";
import { New } from "@rbxts/fusion";
import { BaseContainer } from "./BaseContainer";
import { BorderImage } from "./BorderImage";

export const AvatarBust = (userId: number, layoutOrder?: number) => {
	/* -- Avatar Bust Image -- */
	const avatarImage = New("ImageLabel")({
		Name: "AvatarImage",
		Size: new UDim2(1, 0, 1, 0),
		BackgroundTransparency: 1,

		Image: Players.GetUserThumbnailAsync(
			userId,
			Enum.ThumbnailType.HeadShot,
			Enum.ThumbnailSize.Size420x420,
		)[0] as string, // Get the first image URL
	});

	/* -- Container for Avatar Bust -- */
	return BaseContainer({
		Name: "AvatarBust",
		Size: new UDim2(0, 100, 0, 100),
		BackgroundTransparency: 1,
		LayoutOrder: layoutOrder ?? 0,
		BorderImage: BorderImage.GothicMetal(),
		Content: {
			Image: avatarImage,
		},
	});
};
