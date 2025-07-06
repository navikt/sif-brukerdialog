import tseslint from 'typescript-eslint';
import { createSifConfig } from '@sif/eslint-config/eslint.config.factory.mjs';

export default await createSifConfig({
    tseslint,
});
