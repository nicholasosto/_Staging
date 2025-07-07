import { BorderImage, GamePanel } from "../atoms";
import { ResourceBar } from "./ResourceBar";
import { Layout } from "../tokens";
import { Players } from "@rbxts/services";
import { AvatarBust } from "../molecules/AvatarBust";

export const CharacterInfoCard = (layoutOrder?: number) => {
	/* Avatar Bust */
	const Avatar = AvatarBust(Players.LocalPlayer.UserId);
	const AvatarWidth = Avatar.Size.X.Offset;

	/* Resource Bars */
	const ResourceBarContainer = GamePanel({
		Name: "ResourceBars",
		Size: new UDim2(1, -AvatarWidth, 1, 0),
		Layout: Layout.VerticalSet(),
		LayoutOrder: 2,
		Content: {
			HealthBar: ResourceBar("Health"),
			ManaBar: ResourceBar("Mana"),
			StaminaBar: ResourceBar("Stamina"),
		},
		BackgroundColor3: Color3.fromRGB(30, 30, 30),
		BorderSizePixel: 0,
	});

	/* Organism */
	const organism = GamePanel({
		Name: "CharacterInfoCard",
		Size: new UDim2(0, 300, 0, 105),
		BackgroundTransparency: 0.5,
		BorderSizePixel: 0,
		Layout: Layout.HorizontalSet(0),
		LayoutOrder: layoutOrder ?? 1,
		Content: {
			Avatar: AvatarBust(Players.LocalPlayer.UserId),
			ResourceBars: ResourceBarContainer,
		},
	});

	return organism;
};
