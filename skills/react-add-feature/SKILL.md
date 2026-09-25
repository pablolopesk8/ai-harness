---
name: react-add-feature
description: "Adds a new feature to the React project, integrating it into the home screen"
---

# Skill: Add Feature

## When to Use

When the user asks to add a new feature to the existing project.

## Prerequisites

- The React project must already be scaffolded by the `react-scaffold` skill.
- React Testing Library must be installed. If it is not, install it before Step Integrate into the home screen.

## Steps

### 1. Collect requirements

Ask the user:

- What is the feature name?
- What should it do?
- Where should it be displayed? (home screen, dedicated route, or modal)
- Does it require any external data or API?

Wait for the answers before proceeding. Do not generate code with placeholder values.

### 2. Derive names

From the feature name, derive:

- `<PascalName>`: PascalCase identifier for the component (e.g., `TaskList`).
- `<KebabName>`: kebab-case identifier for files if needed (e.g., `task-list`).

Confirm these with the user if ambiguous.

### 3. Create the component

Create the file `src/components/<PascalName>.tsx` following the React-specific instructions in `.github/instructions/react.instructions.md`.

The component must:

- Use a functional component with an arrow function.
- Use a named export.
- Define a props interface named `<PascalName>Props` if it accepts any props.
- Be self-contained: no logic that belongs to the parent.

### 4. Create styles

Always create `src/components/<PascalName>.module.css`, even if empty at first. Use CSS Modules for all component-specific styles.

### 5. Integrate into the home screen

Modify `src/components/Home.tsx` so the feature can be opened from the home screen. Use the following pattern, which supports multiple features without rewriting the component each time.

Replace the full content of `src/components/Home.tsx` with:

```tsx
import { useState } from 'react';
import styles from './Home.module.css';

type FeatureKey = '<PascalName>';

interface HomeProps {
  projectName: string;
}

export const Home = ({ projectName }: HomeProps) => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey | null>(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{projectName}</h1>

      <div className={styles.features}>
        <button
          type="button"
          aria-label="Open <PascalName>"
          onClick={() => setActiveFeature('<PascalName>')}
        >
          Open <PascalName>
        </button>
      </div>

      {activeFeature === '<PascalName>' && <PascalName />}
    </div>
  );
};
```

Then add the corresponding import at the top of the file:

```tsx
import { <PascalName> } from './<PascalName>';
```

When adding a second feature later, extend the `FeatureKey` union and add another button. Do not duplicate the state.

### 6. Create tests

Create `src/components/__tests__/<PascalName>.test.tsx` using React Testing Library.

Cover at minimum:

- The component renders without errors.
- The primary user action produces the expected result.
- Edge cases called out in Step 1.

### 7. Update project scripts if needed

If `package.json` does not yet have a `test` script, add one that runs the configured test runner (Vitest is recommended for Vite projects).

### 8. Verify

Run the following and confirm each result:

1. `npm run build` completes with exit code 0.
2. `npm run dev` serves on http://localhost:5173 without errors.
3. Clicking the button on the home screen opens the new feature.
4. The new feature renders correctly and behaves as described in Step 1.
5. `npm test` passes all tests for the new component.
