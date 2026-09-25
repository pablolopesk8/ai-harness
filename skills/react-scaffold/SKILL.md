---
name: react-scaffold
description: "Creates a React project with TypeScript and Vite from scratch, including a home screen with the project name"
---

# Skill: Create React Project from Scratch

## When to Use

When the user asks to create a new React project or initialize the current project.

## Prerequisites

- The target directory must be empty, except for the `.github/` folder.
- If the directory is not empty, Vite will prompt interactively. Answer "Ignore files and continue".

## Steps

### 1. Determine the project name

- If the user provided a name, use it.
- Otherwise, use the current directory name or ask the user.
- Store it as `<PROJECT_NAME>` for the rest of this skill.

### 2. Create the project in a temporary directory

Run the following command to scaffold the project in a temporary folder:

```bash
npm create vite@latest temp-scaffold -- --template react-ts --eslint --no-interactive -y
```

### 3. Move generated files to the current directory

Move all files and folders from `temp-scaffold/` to the current directory, **without overwriting the existing `.github/` folder**.

```bash
mv temp-scaffold/* temp-scaffold/.* . 2>/dev/null
rmdir temp-scaffold
```

If any file conflicts with an existing file at the root (e.g., `package.json`), the agent must decide case by case and inform the user.

### 4. Install dependencies

Run the following command:

```bash
npm install
```

### 5. Create the folder structure

Create the following directories using filesystem operations (not shell-specific commands):

- src/components
- src/hooks
- src/utils
- src/types

### 6. Create the home screen

Create the file `src/components/Home.tsx` with the following content:

```tsx
import styles from './Home.module.css';

interface HomeProps {
  projectName: string;
}

export const Home = ({ projectName }: HomeProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{projectName}</h1>
      <p className={styles.subtitle}>Welcome to your React project!</p>
    </div>
  );
};
```

### 7. Create the home screen styles

Create the file `src/components/Home.module.css` with the following content:

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: system-ui, -apple-system, sans-serif;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}
```

### 8. Update src/App.tsx

Replace its content with the following:

```ts
import { Home } from './components/Home';

function App() {
  return <Home projectName="<PROJECT_NAME>" />;
}

export default App;
```

Replace `<PROJECT_NAME>` with the value determined in Step 1.

### 9. Clean up Vite boilerplate

- Delete `src/App.css`.
- Delete `src/index.css` and remove its import from `src/main.tsx`.
- Delete `src/assets/react.svg` and `public/vite.svg`.
- Keep `StrictMode` in `src/main.tsx`.

### 10. Update index.html

Set the `<title>` element to `<PROJECT_NAME>`.

### 11. Update package.json

Set the `name` field to the kebab-case version of `<PROJECT_NAME>`.

### 12. Run the server

Run the following command:

```bash
    npm run dev
```

## Verification

1. `npm run build` completes with exit code 0.
2. `npm run dev` serves on http://localhost:5173 without errors.
3. The home screen displays the exact `<PROJECT_NAME>`.
4. No default Vite boilerplate remains (no Vite logo, no "count is" button).
5. The `index.html` title matches `<PROJECT_NAME>`.
