import Fusion from "@rbxts/fusion";

export const TextSizes = {
	Default: 24,
	Title: 32,
	Subtitle: 28,
	Button: 20,
	BigBar: 18,
	SmallBar: 16,
};

export const ButtonSizes = {
	Default: () => UDim2.fromOffset(150, 50),
	Icon: () => UDim2.fromOffset(30, 30),
	GridButton: () => UDim2.fromOffset(90, 90),
};

export const PanelSizes = {
	ModalPanel: () => UDim2.fromOffset(600, 400),
	ResourceBarContainer: () => UDim2.fromOffset(400, 1),
	ResourceBar: () => UDim2.fromOffset(1, 0.333),
};
