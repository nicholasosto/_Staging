import { GameWindow } from "client/ui/atoms";
import { ScreenKey } from "client/states";

const Key: ScreenKey = "Developer";
export const DeveloperScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {},
	});
};
