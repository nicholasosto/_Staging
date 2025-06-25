/// <reference types="@rbxts/types" />

/**
 * @file        Sizes.ts
 * @module      Sizes
 * @layer       Shared
 * @description Cross-theme numeric constants.
 *
 * ╭───────────────────────────────╮
 * │  Soul Steel · Coding Guide    │
 * │  Fusion v4 · Strict TS · ECS  │
 * ╰───────────────────────────────╯
 */

export const Sizes = {
	/* Component Sizes */
	Avatar: {
		Width: 100,
		Height: 100,
	},

	Badge: {
		Width: 35,
		Height: 35,
	},

	ImageButtonDefault: {
		Width: 50,
		Height: 50,
	},

	ResourceBar: {
		Width: 200,
		Height: 30,
	},

	/* Containers Sizes */
	MenuButtonBar: {
		Width: 300,
		Height: 80,
	},

	ActionBar: {
		Width: 600,
		Height: 100,
	},

	CharacterInfoCard: {
		Width: 300,
		Height: 200,
	},
};

function createUDim2(sizeType: keyof typeof Sizes): UDim2 {
	const size = Sizes[sizeType];
	return UDim2.fromOffset(size.Width, size.Height);
}

export const ComponentSizes = {
	/* Component Sizes */
	Avatar: createUDim2("Avatar"),
	Badge: createUDim2("Badge"),
	ImageButtonDefault: createUDim2("ImageButtonDefault"),

	/* Containers Sizes */
	ActionBar: createUDim2("ActionBar"),
	MenuButtonBar: createUDim2("MenuButtonBar"),
	CharacterInfoCard: createUDim2("CharacterInfoCard"),
	ResourceBar: createUDim2("ResourceBar"),
};
