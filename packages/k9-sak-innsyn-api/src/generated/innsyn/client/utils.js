import { getAuthToken } from '../core/auth';
import { serializeArrayParam, serializeObjectParam, serializePrimitiveParam, } from '../core/pathSerializer';
const PATH_PARAM_RE = /\{[^{}]+\}/g;
const defaultPathSerializer = ({ path, url: _url }) => {
    let url = _url;
    const matches = _url.match(PATH_PARAM_RE);
    if (matches) {
        for (const match of matches) {
            let explode = false;
            let name = match.substring(1, match.length - 1);
            let style = 'simple';
            if (name.endsWith('*')) {
                explode = true;
                name = name.substring(0, name.length - 1);
            }
            if (name.startsWith('.')) {
                name = name.substring(1);
                style = 'label';
            }
            else if (name.startsWith(';')) {
                name = name.substring(1);
                style = 'matrix';
            }
            const value = path[name];
            if (value === undefined || value === null) {
                continue;
            }
            if (Array.isArray(value)) {
                url = url.replace(match, serializeArrayParam({ explode, name, style, value }));
                continue;
            }
            if (typeof value === 'object') {
                url = url.replace(match, serializeObjectParam({
                    explode,
                    name,
                    style,
                    value: value,
                    valueOnly: true,
                }));
                continue;
            }
            if (style === 'matrix') {
                url = url.replace(match, `;${serializePrimitiveParam({
                    name,
                    value: value,
                })}`);
                continue;
            }
            const replaceValue = encodeURIComponent(style === 'label' ? `.${value}` : value);
            url = url.replace(match, replaceValue);
        }
    }
    return url;
};
export const createQuerySerializer = ({ allowReserved, array, object, } = {}) => {
    const querySerializer = (queryParams) => {
        const search = [];
        if (queryParams && typeof queryParams === 'object') {
            for (const name in queryParams) {
                const value = queryParams[name];
                if (value === undefined || value === null) {
                    continue;
                }
                if (Array.isArray(value)) {
                    const serializedArray = serializeArrayParam({
                        allowReserved,
                        explode: true,
                        name,
                        style: 'form',
                        value,
                        ...array,
                    });
                    if (serializedArray)
                        search.push(serializedArray);
                }
                else if (typeof value === 'object') {
                    const serializedObject = serializeObjectParam({
                        allowReserved,
                        explode: true,
                        name,
                        style: 'deepObject',
                        value: value,
                        ...object,
                    });
                    if (serializedObject)
                        search.push(serializedObject);
                }
                else {
                    const serializedPrimitive = serializePrimitiveParam({
                        allowReserved,
                        name,
                        value: value,
                    });
                    if (serializedPrimitive)
                        search.push(serializedPrimitive);
                }
            }
        }
        return search.join('&');
    };
    return querySerializer;
};
export const setAuthParams = async ({ security, ...options }) => {
    for (const auth of security) {
        const token = await getAuthToken(auth, options.auth);
        if (!token) {
            continue;
        }
        const name = auth.name ?? 'Authorization';
        switch (auth.in) {
            case 'query':
                if (!options.query) {
                    options.query = {};
                }
                options.query[name] = token;
                break;
            case 'cookie': {
                const value = `${name}=${token}`;
                if ('Cookie' in options.headers && options.headers['Cookie']) {
                    options.headers['Cookie'] = `${options.headers['Cookie']}; ${value}`;
                }
                else {
                    options.headers['Cookie'] = value;
                }
                break;
            }
            case 'header':
            default:
                options.headers[name] = token;
                break;
        }
        return;
    }
};
export const buildUrl = (options) => {
    const url = getUrl({
        path: options.path,
        query: !options.paramsSerializer ? options.query : undefined,
        querySerializer: typeof options.querySerializer === 'function'
            ? options.querySerializer
            : createQuerySerializer(options.querySerializer),
        url: options.url,
    });
    return url;
};
export const getUrl = ({ path, query, querySerializer, url: _url, }) => {
    const pathUrl = _url.startsWith('/') ? _url : `/${_url}`;
    let url = pathUrl;
    if (path) {
        url = defaultPathSerializer({ path, url });
    }
    let search = query ? querySerializer(query) : '';
    if (search.startsWith('?')) {
        search = search.substring(1);
    }
    if (search) {
        url += `?${search}`;
    }
    return url;
};
export const mergeConfigs = (a, b) => {
    const config = { ...a, ...b };
    config.headers = mergeHeaders(a.headers, b.headers);
    return config;
};
export const axiosHeadersKeywords = [
    'common',
    'delete',
    'get',
    'head',
    'patch',
    'post',
    'put',
];
export const mergeHeaders = (...headers) => {
    const mergedHeaders = {};
    for (const header of headers) {
        if (!header || typeof header !== 'object') {
            continue;
        }
        const iterator = Object.entries(header);
        for (const [key, value] of iterator) {
            if (axiosHeadersKeywords.includes(key) &&
                typeof value === 'object') {
                mergedHeaders[key] = {
                    ...mergedHeaders[key],
                    ...value,
                };
            }
            else if (value === null) {
                delete mergedHeaders[key];
            }
            else if (Array.isArray(value)) {
                for (const v of value) {
                    mergedHeaders[key] = [...(mergedHeaders[key] ?? []), v];
                }
            }
            else if (value !== undefined) {
                mergedHeaders[key] =
                    typeof value === 'object' ? JSON.stringify(value) : value;
            }
        }
    }
    return mergedHeaders;
};
export const createConfig = (override = {}) => ({
    ...override,
});
//# sourceMappingURL=utils.js.map