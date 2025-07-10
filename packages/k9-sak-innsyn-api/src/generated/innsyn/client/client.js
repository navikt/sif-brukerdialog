import axios from 'axios';
import { buildUrl, createConfig, mergeConfigs, mergeHeaders, setAuthParams, } from './utils';
export const createClient = (config = {}) => {
    let _config = mergeConfigs(createConfig(), config);
    const { auth, ...configWithoutAuth } = _config;
    const instance = axios.create(configWithoutAuth);
    const getConfig = () => ({ ..._config });
    const setConfig = (config) => {
        _config = mergeConfigs(_config, config);
        instance.defaults = {
            ...instance.defaults,
            ..._config,
            headers: mergeHeaders(instance.defaults.headers, _config.headers),
        };
        return getConfig();
    };
    const request = async (options) => {
        const opts = {
            ..._config,
            ...options,
            axios: options.axios ?? _config.axios ?? instance,
            headers: mergeHeaders(_config.headers, options.headers),
        };
        if (opts.security) {
            await setAuthParams({
                ...opts,
                security: opts.security,
            });
        }
        if (opts.requestValidator) {
            await opts.requestValidator(opts);
        }
        if (opts.body && opts.bodySerializer) {
            opts.body = opts.bodySerializer(opts.body);
        }
        const url = buildUrl(opts);
        try {
            const _axios = opts.axios;
            const { auth, ...optsWithoutAuth } = opts;
            const response = await _axios({
                ...optsWithoutAuth,
                baseURL: opts.baseURL,
                data: opts.body,
                headers: opts.headers,
                params: opts.paramsSerializer ? opts.query : undefined,
                url,
            });
            let { data } = response;
            if (opts.responseType === 'json') {
                if (opts.responseValidator) {
                    await opts.responseValidator(data);
                }
                if (opts.responseTransformer) {
                    data = await opts.responseTransformer(data);
                }
            }
            return {
                ...response,
                data: data ?? {},
            };
        }
        catch (error) {
            const e = error;
            if (opts.throwOnError) {
                throw e;
            }
            e.error = e.response?.data ?? {};
            return e;
        }
    };
    return {
        buildUrl,
        delete: (options) => request({ ...options, method: 'DELETE' }),
        get: (options) => request({ ...options, method: 'GET' }),
        getConfig,
        head: (options) => request({ ...options, method: 'HEAD' }),
        instance,
        options: (options) => request({ ...options, method: 'OPTIONS' }),
        patch: (options) => request({ ...options, method: 'PATCH' }),
        post: (options) => request({ ...options, method: 'POST' }),
        put: (options) => request({ ...options, method: 'PUT' }),
        request,
        setConfig,
    };
};
//# sourceMappingURL=client.js.map