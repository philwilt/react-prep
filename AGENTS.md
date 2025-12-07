# Agent Guidelines for React Prep App

## Commands
- **Build**: `npm run build` (Vite production build)
- **Dev server**: `npm run dev` (Vite dev server on port 5173)
- **Lint**: `npm run lint` (ESLint with React/JSX rules)
- **Test all**: `npm run test` (Vitest with jsdom)
- **Test single file**: `vitest <file>` or `vitest run <file>`

## Code Style
- **React**: Version 19, JSX without React import
- **Components**: PascalCase, arrow functions, destructured props
- **Hooks**: camelCase with 'use' prefix
- **Styling**: CSS Modules (component.module.css)
- **Imports**: React hooks → components → styles → utilities
- **File extensions**: .jsx for components, .js for hooks/utilities
- **Testing**: Vitest + Testing Library, describe/it blocks
- **Linting**: ESLint with react-hooks, jsx-a11y, react-refresh plugins
- **Formatting**: Follow ESLint rules, no semicolons after JSX returns
- **Error handling**: Use try/catch in async operations, React error boundaries for components
- **Naming**: camelCase for variables/functions, PascalCase for components, UPPER_SNAKE for constants</content>
<parameter name="filePath">/Users/phillipwilt/repos/react-prep/AGENTS.md