# Project Instructions

## Scope

This repository is a small Fastify + TypeScript server. Keep changes consistent with the existing app layout: `app.ts`, `plugins/`, `routes/`, and `test/`.

## Package Manager

- This project uses `pnpm` as the package manager.
- Use `pnpm install` for dependency installation.
- Use `pnpm run <script>` or the equivalent `pnpm <script>` form for project commands.
- Prefer `pnpm` over `npm` for this repository unless a task explicitly requires otherwise.

## Coding Expectations

- Prefer small, focused changes over broad refactors.
- Keep Fastify plugins and routes in their existing autoloaded structure.
- Use TypeScript idioms that match the current code style.
- Do not introduce extra frameworks or architectural patterns unless the task explicitly requires them.
- Match the repo's configured formatting and linting standards: Prettier for formatting and ESLint for code quality.
- Follow the project's existing TypeScript + Node conventions, including single quotes, no semicolons, and CommonJS-compatible Fastify patterns used in this app.

## Lint and Format Standards

- Use `pnpm lint` for ESLint checks.
- Use `pnpm format` to apply Prettier formatting.
- Use `pnpm format:check` when validating formatting without writing files.
- Keep the codebase formatted consistently with the repo's configuration in `.prettierrc.json` and `eslint.config.mjs`.

## Validation

- Validate with the smallest relevant command before concluding work.
- For this project, prefer the existing `pnpm test` script for end-to-end verification when behavior changes.

## Testing

- Prefer real behavior tests over mocks.
- Add or update tests when changing route behavior, plugin registration, or startup expectations.
- Avoid test-only production code.

## Documentation

- Keep README and inline documentation accurate to the current codebase.
- Document new behavior or setup changes when they affect contributors.
