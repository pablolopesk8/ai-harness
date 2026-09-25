---
description: "Standards for React and TypeScript components"
applyTo: "**/*.{tsx,jsx,ts,js}"
---

# React and TypeScript Standards

## Components

- Use `React.FC` only when necessary (prefer direct prop typing).
- Always define an interface for props: `interface Props { ... }`.
- Use `children` as an optional prop when the component is a wrapper.

## Hooks

- Custom hooks must start with `use` (e.g., `useUserData`).
- Avoid heavy logic directly in components; extract it into hooks.
- Use `useMemo` and `useCallback` only when there is a real performance gain.

## State

- For local state, use `useState`.
- For global state, prefer **Zustand** or **Context API** (do not use Redux unless requested).

## Styling

- Use CSS Modules for component-specific styles.
- Avoid inline styles, except for dynamic values.
- Keep CSS classes in camelCase.

## Testing

- Create tests for components in `src/components/__tests__/`.
- Use **React Testing Library** with Jest.
- Test behavior, not implementation.
