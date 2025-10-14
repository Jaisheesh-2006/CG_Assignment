# Overview

This is a full-stack web application built with React, Express, and PostgreSQL. The project appears to be a 3D interactive application (possibly a game or virtual room visualization) using Three.js (via react-three/fiber) for 3D rendering. The application features a modern UI built with Radix UI components and Tailwind CSS, with a REST API backend powered by Express and Drizzle ORM for database operations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **3D Rendering:** Three.js via @react-three/fiber, @react-three/drei, and @react-three/postprocessing for advanced 3D graphics and effects
- **UI Components:** Radix UI primitives for accessible, unstyled components
- **Styling:** Tailwind CSS with custom design tokens for theming
- **State Management:** Zustand with subscribeWithSelector middleware for game/audio state
- **Data Fetching:** TanStack Query (React Query) for server state management

**Architectural Decisions:**
- Component-based architecture with a comprehensive UI component library under `client/src/components/ui/`
- Custom hooks pattern (e.g., `useIsMobile`) for reusable logic
- Path aliases (`@/` for client src, `@shared/` for shared code) for cleaner imports
- Separate stores for different concerns (game state, audio state)
- Support for GLSL shaders via vite-plugin-glsl

**Rationale:** This architecture enables rapid development with a rich 3D interactive experience while maintaining type safety and code organization. The separation between UI components, game logic, and 3D rendering allows for independent development and testing.

## Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with TypeScript (ESM modules)
- **Framework:** Express.js for REST API
- **ORM:** Drizzle ORM with Drizzle Kit for migrations
- **Development:** tsx for running TypeScript directly in development
- **Build:** esbuild for fast production builds

**Architectural Decisions:**
- Express middleware pattern for request/response logging and error handling
- Modular route registration through `registerRoutes` function
- Storage abstraction layer (`IStorage` interface) with in-memory implementation (`MemStorage`)
- Vite integration in development mode for HMR and seamless frontend/backend development
- Static file serving for 3D assets (textures, sounds, geometries)

**Rationale:** The storage abstraction allows swapping between in-memory storage (for development) and database-backed storage without changing business logic. The middleware-based architecture provides clean separation of concerns for logging, error handling, and request processing.

## Data Storage

**Database:** PostgreSQL via Neon serverless driver (@neondatabase/serverless)

**Schema Management:**
- Drizzle ORM with schema defined in `shared/schema.ts`
- Type-safe queries and migrations
- Zod integration for runtime validation

**Current Schema:**
- `users` table with id, username (unique), and password fields
- Insert schemas generated via drizzle-zod for validation

**Migration Strategy:**
- Schema defined in TypeScript
- Migrations output to `./migrations` directory
- Push-based workflow via `npm run db:push`

**Rationale:** Drizzle provides a lightweight, type-safe ORM that works well with TypeScript. The Neon serverless driver enables PostgreSQL usage in serverless/edge environments. The schema-first approach ensures consistency between database and application code.

## External Dependencies

**Database:**
- PostgreSQL (via Neon serverless)
- Connection configured via `DATABASE_URL` environment variable

**Frontend Libraries:**
- **3D Graphics:** Three.js ecosystem (@react-three/fiber, @react-three/drei, @react-three/postprocessing)
- **UI Components:** Extensive Radix UI component collection (accordion, dialog, dropdown, etc.)
- **Utilities:** class-variance-authority for component variants, clsx/tailwind-merge for className management
- **Date Handling:** date-fns for date manipulation
- **Fonts:** @fontsource/inter for typography

**Development Tools:**
- Vite with React plugin and runtime error modal
- TypeScript for type safety
- PostCSS with Tailwind CSS
- Drizzle Kit for database schema management

**Build/Deployment:**
- Vite for client-side bundling
- esbuild for server-side bundling
- Separate build outputs (client to `dist/public`, server to `dist`)

**Asset Management:**
- Support for 3D model formats (GLTF, GLB)
- Audio file support (MP3, OGG, WAV)
- Custom GLSL shader loading