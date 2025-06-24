# Player Journey Conceptual Flow

This document outlines the step-by-step flow that a player experiences in **Soul Steel**.

1. **Join the experience** – teleport to the Hub lobby.
2. **ProfileService** loads persistent data such as currency and the player's gem inventory.
3. The **Lobby UI** allows rolling for new Gems and displays equipped Manifestation slots. First-time players are granted a free *Starter Gem*.
4. **Matchmaking board**
   - Selecting **Create Room** makes a new `BattleRoom` instance and returns the room ID.
   - Friends may **Join** using that ID to enter the same room.
5. A **countdown** (default 30 s) starts once the first player joins.
   - During the countdown each participant can swap their active Manifestation Gem.
   - Chosen gem data replicates read-only to all clients for preview.
6. When the countdown ends a dedicated **Battle Place** is reserved via `TeleportService` with the participant list and their gem IDs.
7. In the **Battle Place** each server creates a `TeamSpawner` for every player which spawns the NPC squad defined by their gem.
   Combat runs until the wave scheduler or free‑for‑all rules determine victory.
8. **Results** (win, participation rewards, new currency) are saved back with `ProfileService` and players return to the Lobby.

