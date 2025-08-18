# Coding Standards (Frontend)

## Naming & Files
- Components: PascalCase, hooks: `useXxx`, modules/utils: kebab-case files
- One component per file; co-locate styles and tests when practical

## Types & Safety
- Prefer explicit types for public APIs and component props
- Avoid `any`; use discriminated unions for variants

## Control Flow
- Use early returns to reduce nesting
- Handle errors explicitly; never swallow exceptions

## Comments
- Explain "why" when logic is non-obvious; avoid trivial comments

## Formatting
- ESLint + Prettier; avoid unrelated reformatting in edits

## Performance
- Memoize expensive calculations; avoid inline object/array props in lists
- Prefer data fetching compatible with Suspense (React Query)

## Accessibility
- Semantic HTML and landmark roles where appropriate
- Keyboard-accessible controls; visible focus
- Color contrast compliant; alt text for images

## Testing
- Vitest + RTL; avoid brittle snapshots
- Test critical flows: API error mapping, loading states, accessibility roles
