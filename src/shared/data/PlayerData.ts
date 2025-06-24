/**
 * Represents the complete data shape for a player in Soul Steel.
 * Each major subsection corresponds to a portion of the player's saved data,
 * and can be updated individually or all at once.
 */

/* Data Transfer Object for Player Data */
import { AttributesDTO, DefaultAttributes } from "./AttributeData";

/* Progression Data Transfer Object - Player Progression */
export interface ProgressionDTO {
	Experience: number; // Player's experience points
	Level: number; // Player's level
}

/* Player Data Interface - Profile*/
export interface PlayerDataDTO {
	Attributes: AttributesDTO;
}

/* Default Player Data - Template for Profile Service*/
export const PlayerDTOTemplate: PlayerDataDTO = {
	Attributes: DefaultAttributes,
};
