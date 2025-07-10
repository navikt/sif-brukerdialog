import type { Auth, AuthToken } from './auth';
import type { BodySerializer, QuerySerializer, QuerySerializerOptions } from './bodySerializer';
export interface Client<RequestFn = never, Config = unknown, MethodFn = never, BuildUrlFn = never> {
    buildUrl: BuildUrlFn;
    connect: MethodFn;
    delete: MethodFn;
    get: MethodFn;
    getConfig: () => Config;
    head: MethodFn;
    options: MethodFn;
    patch: MethodFn;
    post: MethodFn;
    put: MethodFn;
    request: RequestFn;
    setConfig: (config: Config) => Config;
    trace: MethodFn;
}
export interface Config {
    auth?: ((auth: Auth) => Promise<AuthToken> | AuthToken) | AuthToken;
    bodySerializer?: BodySerializer | null;
    headers?: RequestInit['headers'] | Record<string, string | number | boolean | (string | number | boolean)[] | null | undefined | unknown>;
    method?: 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
    querySerializer?: QuerySerializer | QuerySerializerOptions;
    requestValidator?: (data: unknown) => Promise<unknown>;
    responseTransformer?: (data: unknown) => Promise<unknown>;
    responseValidator?: (data: unknown) => Promise<unknown>;
}
//# sourceMappingURL=types.d.ts.map