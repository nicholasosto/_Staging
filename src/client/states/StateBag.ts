import PlayerState from "./PlayerState";
import ProgressionSlice from "./ProgressionSlice";

const playerState = PlayerState.getInstance();

export class StateBag {
	/** Player state instance */
	public static PlayerState = playerState;
	public static ProgressionState = ProgressionSlice.getInstance();
}
