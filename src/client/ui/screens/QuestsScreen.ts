import { GameWindow } from "client/ui/atoms";
import { ScreenKey } from "shared";

const Key: ScreenKey = "Quests";
export const QuestsScreen = () => {
	return GameWindow({
		Name: `${Key}Screen`,
		ScreenKey: Key,
		Content: {},
	});
};
