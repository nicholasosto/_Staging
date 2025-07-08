import { BorderImage, ListContainer, BaseContainer } from "../atoms";
import { ResourceBar } from "./ResourceBar";
import { Players } from "@rbxts/services";
import { AvatarBust } from "../molecules/AvatarBust";

export const CharacterInfoCard = (layoutOrder?: number) => {
	/* Avatar Bust */
	const Avatar = AvatarBust(Players.LocalPlayer.UserId);
	const AvatarWidth = Avatar.Size.X.Offset;

	/* Resource Bars */
	const ResourceBarContainer = ListContainer({
		Name: "ResourceBars",
		Size: new UDim2(1, -AvatarWidth, 1, 0),
		LayoutOrientation: "vertical",
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
	const organism = ListContainer({
		Name: "CharacterInfoCard",
		Size: new UDim2(0, 300, 0, 105),
		BackgroundTransparency: 0.5,
		BorderSizePixel: 0,
		LayoutOrientation: "horizontal",
		LayoutOrder: layoutOrder ?? 1,
		Content: {
			Avatar: AvatarBust(Players.LocalPlayer.UserId),
			ResourceBars: ResourceBarContainer,
		},
	});

	return organism;
};
