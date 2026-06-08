/**
 * Mock for @navikt/oasis - brukes i Storybook for å unngå å laste
 * Node.js-spesifikke moduler (prom-client, cluster, v8, etc.)
 */

export const getToken = () => null;

export const validateToken = async () => ({
    ok: true,
    token: 'mock-token',
});

export const requestOboToken = async () => ({
    ok: true,
    token: 'mock-obo-token',
});
