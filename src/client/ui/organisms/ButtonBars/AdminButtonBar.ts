/// <reference types="@rbxts/types" />

/**
 * @file        AdminButtonBar.ts
 * @module      AdminButtonBar
 * @layer       Client/UI/Organisms
 * @description Horizontal bar of service test buttons for administrators.
 */

import { HorizontalContainer } from "client/ui/atoms";

export const AdminButtonBar = () => {
	const Component = HorizontalContainer({
		Name: "AdminButtonBar",
		Size: UDim2.fromOffset(380, 50),
		BackgroundTransparency: 0.5,
		Gap: 5,
		Content: {},
	});
	return Component;
};
