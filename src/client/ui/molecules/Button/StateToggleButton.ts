import Fusion, { Children, Computed, New, OnEvent, Value } from "@rbxts/fusion";
import { GameImage } from "client/ui/atoms";
import { GameImages, ScreenState } from "shared";

export interface ToggleMenuProps extends Fusion.PropertyTable<ImageButton> {
	SelectedState?: Value<boolean>;
}

export const StateToggleButton = (props: ToggleMenuProps) => {
	const SelectedState = props.SelectedState ?? Value(false);
	const Hovered = Value(false);

	const computedBGColor = Computed(() => {
		if (SelectedState.get()) {
			return new Color3(0.75, 0.29, 0.29);
		} else if (Hovered.get()) {
			return new Color3(0.87, 0.94, 0.53);
		}
		return new Color3(0.08, 0.04, 0.04);
	});

	const button = New("ImageButton")({
		Name: props.Name ?? "ToggleMenuButton",
		Size: props.Size ?? UDim2.fromOffset(50, 50),
		Image: GameImages.MenuButtonImage,
		BackgroundColor3: computedBGColor,
		[OnEvent("MouseEnter")]: () => Hovered.set(true),
		[OnEvent("MouseLeave")]: () => Hovered.set(false),
		[OnEvent("Activated")]: () => SelectedState.set(!SelectedState.get()),
		[Children]: {
			ButtonIcon: GameImage({
				Name: "SoulForgeIcon",
				Image: GameImages.MenuIcon.SoulForge,
				Size: UDim2.fromScale(0.8, 0.8),
				BackgroundTransparency: 1,
				Position: UDim2.fromScale(0.5, 0.5),
				AnchorPoint: new Vector2(0.5, 0.5),
				ImageColor3: new Color3(1, 1, 1), // White
			}),
		},
	});
	return button;
};
