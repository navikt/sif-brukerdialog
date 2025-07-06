import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import { createSifConfig } from '@sif/eslint-config/eslint.config.factory.mjs';

export default createSifConfig({
    pluginJs,
    eslintConfigPrettier,
    jsxA11y,
    pluginReact,
    vitest,
    globals,
    tseslint,
    reactHooks,
});
