import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const ungDeltakelseOpplyserApiClient = axios.create({
    ...axiosConfig,
    // baseURL: getMaybeEnv('UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH'),
});

const convertNullToUndefined = (obj: any): any => {
    if (obj === null) {
        return undefined;
    }
    if (Array.isArray(obj)) {
        return obj.map(convertNullToUndefined);
    }
    if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertNullToUndefined(value)]));
    }
    return obj;
};

ungDeltakelseOpplyserApiClient.interceptors.response.use(
    (response) => {
        response.data = convertNullToUndefined(response.data);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    // const source = Axios.CancelToken.source();
    const promise = ungDeltakelseOpplyserApiClient({
        ...config,
        ...options,
        // cancelToken: source.token,
    }).then(({ data }) => data);

    // @ts-ignore
    // promise.cancel = () => {
    //     source.cancel('Query was cancelled');
    // };

    return promise;
};
