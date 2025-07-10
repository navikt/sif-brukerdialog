import type { QuerySerializer, QuerySerializerOptions } from '../core/bodySerializer';
import type { Client, ClientOptions, Config, RequestOptions } from './types';
export declare const createQuerySerializer: <T = unknown>({ allowReserved, array, object, }?: QuerySerializerOptions) => (queryParams: T) => string;
export declare const setAuthParams: ({ security, ...options }: Pick<Required<RequestOptions>, "security"> & Pick<RequestOptions, "auth" | "query"> & {
    headers: Record<any, unknown>;
}) => Promise<void>;
export declare const buildUrl: Client['buildUrl'];
export declare const getUrl: ({ path, query, querySerializer, url: _url, }: {
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    querySerializer: QuerySerializer;
    url: string;
}) => string;
export declare const mergeConfigs: (a: Config, b: Config) => Config;
export declare const axiosHeadersKeywords: readonly ["common", "delete", "get", "head", "patch", "post", "put"];
export declare const mergeHeaders: (...headers: Array<Required<Config>["headers"] | undefined>) => Record<any, unknown>;
export declare const createConfig: <T extends ClientOptions = ClientOptions>(override?: Config<Omit<ClientOptions, keyof T> & T>) => Config<Omit<ClientOptions, keyof T> & T>;
//# sourceMappingURL=utils.d.ts.map