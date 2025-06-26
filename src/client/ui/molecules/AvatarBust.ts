import { Players } from "@rbxts/services";
import { New, Value } from "@rbxts/fusion";
import { BorderImage, GamePanel } from "../atoms";

export const AvatarBust = (userId: number, layoutOrder?: number) => {
	const avatarImage = New("ImageLabel")({
		Name: "AvatarImage",
		Size: new UDim2(1, 0, 1, 0),
		BackgroundTransparency: 1,
		LayoutOrder: layoutOrder ?? 0,
		Image: Players.GetUserThumbnailAsync(
			userId,
			Enum.ThumbnailType.HeadShot,
			Enum.ThumbnailSize.Size420x420,
		)[0] as string, // Get the first image URL
	});

	return GamePanel({
		Name: "AvatarBust",
		Size: new UDim2(0, 100, 0, 100),
		BackgroundTransparency: 1,
		BorderImage: BorderImage.GothicMetal(),
		Content: {
			Image: avatarImage,
		},
	});
};
