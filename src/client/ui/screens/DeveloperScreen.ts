import { GameWindow } from "client/ui/atoms";
import { ScreenKey } from "shared";
import { AdminBar } from "../organisms";

const Key: ScreenKey = "Developer";

export const DeveloperScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {
			BasicInfoPanel: AdminBar(),
		},
	});
};
