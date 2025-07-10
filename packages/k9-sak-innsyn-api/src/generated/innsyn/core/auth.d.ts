export type AuthToken = string | undefined;
export interface Auth {
    in?: 'header' | 'query' | 'cookie';
    name?: string;
    scheme?: 'basic' | 'bearer';
    type: 'apiKey' | 'http';
}
export declare const getAuthToken: (auth: Auth, callback: ((auth: Auth) => Promise<AuthToken> | AuthToken) | AuthToken) => Promise<string | undefined>;
//# sourceMappingURL=auth.d.ts.map