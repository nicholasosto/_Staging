# AGENTS.md - Shared (Replicated Storage Scripts)

## Main Systems

1. Definitions
   - Contains type definitions and interfaces used across the system.
   - Example: `Profile.ts` defines the structure of a player profile and keys defined are used to simplify data access and communication.
   - Example: `Attributes.ts` defines player attributes, metadata for UI, and helper types and methods.
2. Network
    - Handles communication between client and server.
    - Example: `ServerNetwork.ts` defines server-side events and methods to send updates to clients.
    - Example: `ClientNetworkService.ts` defines client-side methods to request data from the server
3. Calculations
   - Contains logic for calculating player stats and abilities.
   - Example: `ResourceCalculator.ts` contains functions to calculate player resources like health and mana.
   