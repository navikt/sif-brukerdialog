/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

import { createAliasConfig } from './vite.shared';

export default defineConfig({
    resolve: {
        alias: createAliasConfig(),
    },
    test: {
        exclude: ['./playwright/**/*', 'node_modules', './dist/**/*', '**/*.spec.tsx', '**/*.spec.ts'],
        globals: true,
        environment: 'jsdom',
        css: false,
    },
});

//     1. søke fra en dato i aug
//     2. auto behandling og vedtaksbrev
//     3. får oppgave om å rapportere inntekt 1.okt
//     4a. Ikke avvik: autobehandling med vedtaksbrev om reduksjon
//     4b. varsel om kontroll av inntekt
//     5a svarer uten kommentar, autobehandling med brev
//     5b svarer med kommentar, aksjonspunkt..

// Eks 2 Lik som eks 1, men også vise veilederapp (før søknad). Det er fint for saksbehandlerne å se.
// Eks 3 Sette sluttdato ... ...
