import Fusion, { Children, OnEvent, PropertyTable } from "@rbxts/fusion";
import { GamePanel } from "../Container";
import { GameImage } from "../Image";

export interface GameButtonProps extends PropertyTable<ImageButton> {
	Name?: string;
	Image?: string;
	OnClick?: () => void;
}

export function GameButton(props: GameButtonProps) {
	return GamePanel({
		Name: props.Name,
		Size: props.Size ?? UDim2.fromOffset(100, 50),
		BackgroundColor3: new Color3(0.2, 0.2, 0.2),
		BorderSizePixel: 0,
		Children: {
			ButtonImage: Fusion.New("ImageButton")({
				Name: "ButtonImage",
				ImageTransparency: 1,
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				[OnEvent("Activated")]: () => {
					props.OnClick?.();
				},
				[Children]: {
					Image: GameImage({
						Name: "ButtonImage",
						RatioConstraint: 1,
						Image: props.Image ?? "rbxassetid://121566852339881",
					}),
				},
			}),
		},
	});
}
