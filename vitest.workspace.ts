import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
    './apps/dine-pleiepenger/vitest.config.ts',
    './apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/vitest.config.ts',
    './apps/endringsmelding-pleiepenger/vitest.config.ts',
    './apps/omsorgsdager-aleneomsorg-dialog/vite.config.ts',
    './apps/omsorgspengerutbetaling-arbeidstaker-soknad/vitest.config.ts',
    './apps/omsorgspengerutbetaling-soknad/vitest.config.ts',
    './apps/omsorgspengesoknad/vitest.config.ts',
    './apps/pleiepenger-i-livets-sluttfase-soknad/vitest.config.ts',
    './apps/pleiepenger-sykt-barn/vitest.config.ts',
    './apps/sif-ettersending/vitest.config.ts',
    './packages/sif-common-core-ds/vitest.config.ts',
    './packages/sif-common-forms-ds/vitest.config.ts',
    './packages/sif-common-formik-ds/vitest.config.ts',
    './packages/sif-common-utils/vitest.config.ts',
]);
