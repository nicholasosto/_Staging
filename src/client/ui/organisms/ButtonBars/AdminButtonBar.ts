/// <reference types="@rbxts/types" />

/**
 * @file        AdminButtonBar.ts
 * @module      AdminButtonBar
 * @layer       Client/UI/Organisms
 * @description Horizontal bar of service test buttons for administrators.
 */

import { ListContainer } from "client/ui/atoms";

export const AdminButtonBar = () => {
	const Component = ListContainer({
		Name: "AdminButtonBar",
		Size: UDim2.fromOffset(380, 50),
		LayoutOrientation: "horizontal",
		Gap: 5,
		Content: {},
	});
	return Component;
};
