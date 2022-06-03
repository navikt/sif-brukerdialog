import { AxiosError } from 'axios';
export declare const isForbidden: ({ response }: AxiosError) => boolean;
export declare const isUnauthorized: (error: AxiosError) => boolean;
export declare const isUserLoggedOut: (error: AxiosError) => boolean;
export declare const getStartedSøknadRequestParam: (date?: Date) => string | undefined;
