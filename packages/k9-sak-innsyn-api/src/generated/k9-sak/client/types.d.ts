import type { AxiosError, AxiosInstance, AxiosResponse, AxiosStatic, CreateAxiosDefaults } from 'axios';
import type { Auth } from '../core/auth';
import type { Client as CoreClient, Config as CoreConfig } from '../core/types';
export interface Config<T extends ClientOptions = ClientOptions> extends Omit<CreateAxiosDefaults, 'auth' | 'baseURL' | 'headers' | 'method'>, CoreConfig {
    axios?: AxiosStatic;
    baseURL?: T['baseURL'];
    headers?: CreateAxiosDefaults['headers'] | Record<string, string | number | boolean | (string | number | boolean)[] | null | undefined | unknown>;
    throwOnError?: T['throwOnError'];
}
export interface RequestOptions<ThrowOnError extends boolean = boolean, Url extends string = string> extends Config<{
    throwOnError: ThrowOnError;
}> {
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    security?: ReadonlyArray<Auth>;
    url: Url;
}
export type RequestResult<TData = unknown, TError = unknown, ThrowOnError extends boolean = boolean> = ThrowOnError extends true ? Promise<AxiosResponse<TData extends Record<string, unknown> ? TData[keyof TData] : TData>> : Promise<(AxiosResponse<TData extends Record<string, unknown> ? TData[keyof TData] : TData> & {
    error: undefined;
}) | (AxiosError<TError extends Record<string, unknown> ? TError[keyof TError] : TError> & {
    data: undefined;
    error: TError extends Record<string, unknown> ? TError[keyof TError] : TError;
})>;
export interface ClientOptions {
    baseURL?: string;
    throwOnError?: boolean;
}
type MethodFn = <TData = unknown, TError = unknown, ThrowOnError extends boolean = false>(options: Omit<RequestOptions<ThrowOnError>, 'method'>) => RequestResult<TData, TError, ThrowOnError>;
type RequestFn = <TData = unknown, TError = unknown, ThrowOnError extends boolean = false>(options: Omit<RequestOptions<ThrowOnError>, 'method'> & Pick<Required<RequestOptions<ThrowOnError>>, 'method'>) => RequestResult<TData, TError, ThrowOnError>;
type BuildUrlFn = <TData extends {
    body?: unknown;
    path?: Record<string, unknown>;
    query?: Record<string, unknown>;
    url: string;
}>(options: Pick<TData, 'url'> & Omit<Options<TData>, 'axios'>) => string;
export type Client = CoreClient<RequestFn, Config, MethodFn, BuildUrlFn> & {
    instance: AxiosInstance;
};
export type CreateClientConfig<T extends ClientOptions = ClientOptions> = (override?: Config<ClientOptions & T>) => Config<Required<ClientOptions> & T>;
export interface TDataShape {
    body?: unknown;
    headers?: unknown;
    path?: unknown;
    query?: unknown;
    url: string;
}
type OmitKeys<T, K> = Pick<T, Exclude<keyof T, K>>;
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = OmitKeys<RequestOptions<ThrowOnError>, 'body' | 'path' | 'query' | 'url'> & Omit<TData, 'url'>;
export type OptionsLegacyParser<TData = unknown, ThrowOnError extends boolean = boolean> = TData extends {
    body?: any;
} ? TData extends {
    headers?: any;
} ? OmitKeys<RequestOptions<ThrowOnError>, 'body' | 'headers' | 'url'> & TData : OmitKeys<RequestOptions<ThrowOnError>, 'body' | 'url'> & TData & Pick<RequestOptions<ThrowOnError>, 'headers'> : TData extends {
    headers?: any;
} ? OmitKeys<RequestOptions<ThrowOnError>, 'headers' | 'url'> & TData & Pick<RequestOptions<ThrowOnError>, 'body'> : OmitKeys<RequestOptions<ThrowOnError>, 'url'> & TData;
export {};
//# sourceMappingURL=types.d.ts.map