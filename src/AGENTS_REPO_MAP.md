# AGENTS.md - Server Directory

## Soul Steel Server Architecture & Repository Map

This document provides a comprehensive overview of the server-side architecture and serves as a reference for AI agents and developers working on the Soul Steel project. It includes detailed directory mapping and maintenance instructions.

## 📂 Repository Map

### Root Structure

```text
e:\_Staging/
├── .codex/                     # Editor configuration and agent instructions
├── .github/                    # GitHub workflows and templates
├── .vscode/                    # VS Code settings and extensions
├── build/                      # Build outputs and Roblox place files
├── Documents/                  # Project documentation
├── include/                    # External Lua dependencies
├── scripts/                    # Build and utility scripts
├── src/                        # Source code (TypeScript)
│   ├── client/                 # Client-side code
│   ├── server/                 # Server-side code (THIS DIRECTORY)
│   ├── shared/                 # Shared code between client/server
│   ├── tasks/                  # Development tasks and templates
│   └── theme/                  # UI theme definitions
├── tasks/                      # Task management and CLI tools
├── tools/                      # Nx project configuration
└── types/                      # Global TypeScript type definitions
```

### Server Directory Structure (`src/server/`)

```text
server/
├── index.ts                    # Barrel export for server modules
├── main.server.ts              # Server entry point and bootstrap
├── ServiceWrapper.ts           # Service management wrapper
├── classes/                    # Server-side class definitions
│   ├── index.ts               # Barrel export
│   ├── components/            # ECS-style components
│   │   ├── index.ts
│   │   └── HazardComponent.ts
│   ├── EnvironmentEffects/    # Environmental hazard system
│   │   ├── index.ts
│   │   └── Hazard.ts
│   ├── npc/                   # Non-player character system
│   │   ├── index.ts
│   │   └── NPC.ts
│   └── playground/            # Development/testing classes
│       ├── index.ts
│       ├── AlienBob.ts
│       ├── AlienOrganism.ts
│       ├── Manifestation.ts
│       └── OrganismFood.ts
├── entity/                     # Entity management system
│   ├── index.ts               # Barrel export
│   └── EvolvingOrganism.ts    # Core organism entity
├── genetics/                   # Genetics and evolution system
│   ├── index.ts               # Barrel export
│   └── CodonExpressions.ts    # Genetic code expressions
├── network/                    # Server networking layer
│   ├── index.ts               # Barrel export
│   ├── listener.server.ts     # Network event listener
│   └── ServerNetwork.ts       # Network service
├── services/                   # Core game services
│   ├── index.ts               # Barrel export
│   ├── AGENTS.md              # Service-specific documentation
│   ├── AbilityService.ts      # Player ability management
│   ├── AttributesService.ts   # Player attribute system
│   ├── BattleRoomService.ts   # Combat arena management
│   ├── DataService.ts         # Player data persistence
│   ├── NPCService.ts          # NPC behavior management
│   ├── OrganismService.ts     # Organism lifecycle management
│   ├── ProgressionService.ts  # Player progression tracking
│   ├── ResourcesService.ts    # Resource management
│   ├── SettingsService.ts     # Game settings management
│   ├── SSEntityService.ts     # Entity state service
│   ├── StatusEffectService.ts # Status effect system
│   └── WeaponService.ts       # Weapon and combat system
└── zones/                      # Game zone management
    ├── index.ts               # Barrel export
    ├── BattleZone.ts          # Combat zone implementation
    ├── LobbyZone.ts           # Lobby/hub zone
    ├── ZoneBase.ts            # Base zone class
    └── zone.server.ts         # Zone server entry point
```

### Related Directories

#### Client Directory (`src/client/`)

```text
client/
├── index.ts                   # Client barrel export
├── main.client.ts             # Client entry point
├── network/                   # Client networking
├── states/                    # Client state management
└── ui/                        # User interface components
    ├── atoms/                 # Basic UI components
    ├── molecules/             # Composite UI components
    ├── organisms/             # Complex UI systems
    ├── screens/               # Full screen UIs
    └── tokens/                # Design tokens and styles
```

#### Shared Directory (`src/shared/`)

```text
shared/
├── index.ts                   # Shared barrel export
├── assets/                    # Game assets (images, audio, etc.)
├── calculations/              # Shared calculations
├── classes/                   # Shared class definitions
├── constants/                 # Game constants
├── definitions/               # Type definitions and interfaces
├── factory/                   # Object factory functions
├── genetics/                  # Shared genetics system
├── helpers/                   # Utility functions
├── network/                   # Network protocol definitions
└── physics/                   # Physics utilities
```

## 🔧 Maintenance Instructions

### When Adding New Files

1. **Update this Repository Map**
   - Add new files/directories to the appropriate section
   - Include brief descriptions of purpose
   - Update file counts and structure diagrams

2. **Create Barrel Exports**
   - Add new modules to relevant `index.ts` files
   - Follow existing export patterns
   - Ensure TypeScript compilation remains clean

3. **Documentation Requirements**
   - Add TSDoc headers to all new `.ts` files
   - Follow the project's commenting conventions
   - Update relevant documentation files

### When Modifying Structure

1. **Update All References**
   - Check import statements across the codebase
   - Update any documentation that references old paths
   - Verify barrel exports are still correct

2. **Validate Build Process**
   - Run `nx build` to ensure compilation succeeds
   - Check that Roblox Studio can load the generated Lua
   - Test that all services initialize correctly

3. **Update Documentation**
   - Modify this AGENTS.md file
   - Update any other relevant documentation
   - Consider updating the main project AGENTS.md if needed

### When Detecting Unlisted Files

If you encounter files not listed in this map:

1. **Investigate the File**
   - Determine its purpose and functionality
   - Check if it's a temporary or generated file
   - Verify it belongs in the repository

2. **Update the Map**
   - Add the file to the appropriate section
   - Include a description of its purpose
   - Note who created it and when (if possible)

3. **Report the Discovery**
   - Add a comment in your code/commit about the update
   - Consider if other developers need to be notified
   - Update any related documentation

## 🏗️ Architecture Overview

### Service Layer

The server uses a service-oriented architecture where each major game system is encapsulated in a service class. Services handle:

- Game state management
- Player data persistence
- Business logic enforcement
- Cross-system communication

### Zone System

Zones represent different areas of the game world:

- **LobbyZone**: Player hub and social area
- **BattleZone**: Combat and PvP encounters
- **ZoneBase**: Abstract base class for all zones

### Entity System

A hybrid ECS (Entity Component System) approach:

- **Entities**: Core game objects (players, NPCs, organisms)
- **Components**: Reusable behavior and data modules
- **Services**: Systems that operate on entities and components

### Network Layer

Client-server communication is handled through:

- **ServerNetwork**: Main networking service
- **Event Listeners**: Handle specific client requests
- **Protocol Definitions**: Shared between client and server

## 🔍 Development Guidelines

### Adding New Services

1. Create service file in `src/server/services/`
2. Extend base service pattern from existing services
3. Add to services barrel export (`services/index.ts`)
4. Initialize in `ServiceWrapper.ts`
5. Update this documentation

### Creating New Zones

1. Create zone file in `src/server/zones/`
2. Extend `ZoneBase` class
3. Implement required abstract methods
4. Add to zones barrel export (`zones/index.ts`)
5. Register in zone server (`zones/zone.server.ts`)

### Implementing New Entities

1. Create entity file in `src/server/entity/`
2. Follow existing entity patterns
3. Add any required components to `classes/components/`
4. Update entity barrel exports
5. Consider shared type definitions

## 📝 File Naming Conventions

- **Services**: `*Service.ts` (e.g., `DataService.ts`)
- **Zones**: `*Zone.ts` (e.g., `BattleZone.ts`)
- **Entities**: Descriptive names (e.g., `EvolvingOrganism.ts`)
- **Components**: `*Component.ts` (e.g., `HazardComponent.ts`)
- **Barrel Files**: Always `index.ts`

## 🎯 Key Integration Points

### Client-Server Communication

- Events defined in `shared/network/`
- Client handlers in `client/network/`
- Server handlers in `server/network/`

### Data Persistence

- Handled by `DataService.ts`
- Player profiles stored using ProfileService
- Shared data structures in `shared/definitions/`

### State Synchronization

- Server services maintain authoritative state
- Client receives updates through network events
- Shared calculations ensure consistency

---

**Last Updated**: 2025-01-12  
**Maintainer**: GitHub Copilot  
**Version**: 1.0.0

> **Note**: This file should be updated whenever the server directory structure changes. AI agents and developers are responsible for keeping this documentation current and accurate.
