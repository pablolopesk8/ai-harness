# Global Project Instructions

## Project Context

- This is a React project with TypeScript, built with Vite.
- Package manager: npm.
- Styling: CSS Modules.
- Folder structure: `src/components/`, `src/hooks/`, `src/utils/`.

## Project Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Production build: `npm run build`
- Run tests: `npm test`

## Code Standards

- Use **functional components** with hooks (never class components).
- Use **TypeScript strict mode**.
- Name component files with PascalCase (e.g., `UserProfile.tsx`).
- Use **named exports** for components.
- Prefer **arrow functions** for components.
- Import React only when necessary (with `jsx: react-jsx`).

## Component Structure

- Each component must have its own `.tsx` file.
- If a component has styles, create a `.module.css` file next to it.
- Types and interfaces should stay in the component file or in `src/types/`.

## Business Rules

- The home screen must display the project name.
- New features must be added as independent components in `src/components/`.
- Each new feature must be registered on the home page or in a route.
