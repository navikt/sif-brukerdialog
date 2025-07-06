# @sif/eslint-config

Shared ESLint configuration for SIF projects with minimal boilerplate.

## Usage

### Recommended approach (minimal boilerplate)

```javascript
// eslint.config.mjs
import tseslint from 'typescript-eslint';
import { createSifConfig } from '@sif/eslint-config/eslint.config.factory.mjs';

export default await createSifConfig({
    tseslint,
});
```

### Legacy approach (for backward compatibility)

```javascript
// eslint.config.mjs
import config from '@sif/eslint-config';

export default config;
```

## Why the factory approach?

The factory approach solves module resolution issues that can occur in monorepos when using `typescript-eslint`. By importing `typescript-eslint` locally in your project and passing it to the factory, we avoid the "Cannot read properties of undefined" errors while still maintaining a shared configuration.

All other plugins are imported directly in the shared config, so you only need to handle one import locally.

## Dependencies

Make sure your project has these dependencies:

```json
{
    "devDependencies": {
        "typescript-eslint": "^8.35.1",
        "eslint": "^9.30.1"
    }
}
```
