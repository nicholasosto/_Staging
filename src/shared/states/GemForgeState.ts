import { ItemDTO } from "shared/data";
import { Network } from "shared/network";

/*========================== Events and Remotes ==========================*/

/*========================== State Definition =========================*/
export interface GemForgeState {
	enabled: boolean; // Whether the Gem Forge UI is enabled
	gemInventory: Map<number, ItemDTO>; // Inventory of gems available for forging
}
