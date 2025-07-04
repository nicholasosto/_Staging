# Task1_FixAbilityBar.md

## 🍿 Feature / Fix Title

*Fix AbilityBar component to properly display ability buttons with cooldowns.*

---

### 1 • Context
> The AbilityBar component is crucial for displaying the player's abilities and their cooldown states. Currently, it does not accurately reflect the players stored abilities.
> I want to ensure that the PlayerState is being initialized and updated correctly, and that the AbilityBar displays the correct abilities with their cooldowns.

### 2 • Goal

- In the PlayerHUD Screen, the AbilityBar should display the player's abilities.
- Each ability button should show the correct cooldown state based on the player's current abilities.
- The AbilityBar should be responsive to changes in the player's abilities, such as when a new ability is learned or an existing ability's cooldown changes.
- Removed ability buttons should not be displayed in the AbilityBar.

### 3 • Deliverables

| ID | Item | Format | Notes |
|----|------|--------|-------|
| D1 | `AbilityBar.ts` | code file | Must compile under `strict`. |

### 4 • Acceptance Criteria (AC)

1. Builds with `npm run build` ☐  
2. Matches style guide (`eslint --fix`) ☐  
3. Public API exactly matches **Interface** section ☐  
4. No TODOs / console logs in final diff ☐  

### 5 • Interface (source of truth)

1. [AbilityBar.ts](../client/ui/organisms/ButtonBars/AbilityBar.ts) ```UI Component```
   - Displays a list of ability buttons based on the player's current abilities.
   - Each button should reflect the cooldown state of the corresponding ability.
   - Should be used in the PlayerHUD Screen to show active abilities.
2. [PlayerState.ts](../client/states/PlayerState.ts) ```State Management```
   - Manages the player's current abilities and their cooldown states.
   - Provides methods to update abilities and trigger re-renders of the AbilityBar.
3. [ClientNetwork](../client/network/) ```Network Communication```
    - Handles communication with the server to fetch the player's abilities.
    - Ensures that the AbilityBar is updated with the latest abilities from the server.
4. [Shared Network](../shared/network/) ```Networking```
   - Handles communication between the client and server for ability updates.
   - Ensures that the AbilityBar reflects the most up-to-date information from the server.
5. [Server Network](../server/network/) ```Server Communication```
   - Manages the server-side logic for handling ability updates and cooldowns.
   - Ensures that the server sends the correct ability data to the client.
6. [PlayerHUD Screen](../client/ui/screens/PlayerHUD.ts) ```Screen Component```
   - Integrates the AbilityBar into the player's HUD.
   - Ensures that the AbilityBar is displayed correctly within the overall player interface.
7. [AbilityKey](../shared/data/AbilityData.ts) ```Data Type```
   - Represents the unique identifier for each ability.
   - Used to map abilities to their corresponding buttons in the AbilityBar.
