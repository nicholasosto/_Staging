# Next Steps

This document captures potential improvements and follow-up tasks for the current services-based architecture.

- Flesh out **AttributesService** with proper validation (level scaling, spendable point limits).
- Expose server-side attribute updates to the client through a new network event.
- Expand **ResourcesService** regeneration logic into configurable rates per resource.
- Implement persistence for new data fields through **DataService**.
- Review client state synchronization after service mutations.
- Ensure all new folders maintain an `index.ts` barrel for exports.

