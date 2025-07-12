/// <reference types="@rbxts/types" />
/**
 * Service Module Template
 * This comment section is for this file only, actual services follow best practices using TSDoc style comments.
 * @MayImport
 * - Import from shared definitions, assets, and utility modules.
 * - Import from server services as needed.
 * @MustHaves
 * - Have an instance variable for singleton pattern.
 * - Implement a Start method to initialize the service.
 * @MayHaves
 * - Mutator methods for modifying state.
 * - Helper methods for common operations.
 * - Reference to ServerNetwork module to handle network events.
 * - Record of player or SSEntity and the service specific data it manages.
 */

const SERVICE_NAME = "ServiceModuleTemplate";

declare type ServiceData = unknown; // Replace with actual data type for service

export class ServiceModuleTemplate {
    /* MUST HAVE: Singleton Instance */
    private static _instance: ServiceModuleTemplate | undefined;

    /* MAY HAVE: Data Record/Map */
    private readonly _playerDataMap = new Map<Player, ServiceData>();
    /* MAY HAVE: Additional Records (example for Combat Service) */
    private readonly _combatResultsRecord: Record<string, ServiceData> = {};

    /* MUST HAVE: Constructor */
    private constructor() {
        warn(`${SERVICE_NAME} initialized.`);
    }

    /* Start Method */
    public static Start(): ServiceModuleTemplate {
        if (!this._instance) {
            this._instance = new ServiceModuleTemplate();
        }
        return this._instance;
    }

    /* Mutator Method Example */
    public static MyServiceMethod(player: Player, someData: string): void {
        // Example method that does something with the player and data
        warn(`MyServiceMethod called by ${player.Name} with data: ${someData}`);
        // You can add logic here to handle the data or interact with the player
    }

    // Helper Method Example
    public static Destroy(): void {
        if (this._instance) {
            warn(`${SERVICE_NAME} destroyed.`);
            this._instance = undefined; // Clear the instance for garbage collection
        }
    }
}
