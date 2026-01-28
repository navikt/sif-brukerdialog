/**
 * Mock for withAuthentication - brukes i Storybook for å unngå å laste
 * Node.js-spesifikke moduler fra @navikt/oasis (prom-client, cluster, v8, etc.)
 */

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ServerSidePropsResult {}

export interface TokenPayload {
    sub: string;
    iss: string;
    client_amr: string;
    pid: string;
    token_type: string;
    client_id: string;
    acr: string;
    scope: string;
    exp: number;
    iat: number;
    client_orgno: string;
    jti: string;
    consumer: {
        authority: string;
        ID: string;
    };
}

export const defaultPageHandler = async (): Promise<{ props: ServerSidePropsResult }> => {
    return {
        props: {},
    };
};

export function withAuthenticatedPage() {
    return async function withBearerTokenHandler(): Promise<{ props: ServerSidePropsResult }> {
        return {
            props: {},
        };
    };
}

export function withAuthenticatedApi() {
    return async function withBearerTokenHandler(): Promise<void> {
        return;
    };
}

export async function getRequestContext(): Promise<null> {
    return null;
}
