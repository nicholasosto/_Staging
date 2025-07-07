import PlayerState from "./PlayerState";

const playerState = PlayerState.getInstance();

export class StateBag {
	/** Player state instance */
	public static PlayerState = playerState;
}
