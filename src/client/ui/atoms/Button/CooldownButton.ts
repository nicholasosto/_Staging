import Fusion, { Computed, OnEvent } from "@rbxts/fusion";

export interface CooldownButtonProps {
	ImageId: string;
	Cooldown: Computed<number>;
	OnActivate: () => void;
}

export const CooldownButton = (props: CooldownButtonProps): Frame => {
	const { ImageId, Cooldown, OnActivate } = props;

	const button = Fusion.New("ImageButton")({
		Size: UDim2.fromOffset(64, 64),
		Image: ImageId,
		BackgroundTransparency: 1,
		[OnEvent("Activated")]: () => {
			if (Cooldown.get() <= 0) {
				OnActivate();
			}
		},
	});

	Fusion.OnChange(Cooldown, (value) => {
		if (value > 0) {
			button.ImageTransparency = 0.5; // Show as disabled
		} else {
			button.ImageTransparency = 0; // Show as enabled
		}
	});

	return button;
};
