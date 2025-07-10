const extraPrefixesMap = {
    $body_: 'body',
    $headers_: 'headers',
    $path_: 'path',
    $query_: 'query',
};
const extraPrefixes = Object.entries(extraPrefixesMap);
const buildKeyMap = (fields, map) => {
    if (!map) {
        map = new Map();
    }
    for (const config of fields) {
        if ('in' in config) {
            if (config.key) {
                map.set(config.key, {
                    in: config.in,
                    map: config.map,
                });
            }
        }
        else if (config.args) {
            buildKeyMap(config.args, map);
        }
    }
    return map;
};
const stripEmptySlots = (params) => {
    for (const [slot, value] of Object.entries(params)) {
        if (value && typeof value === 'object' && !Object.keys(value).length) {
            delete params[slot];
        }
    }
};
export const buildClientParams = (args, fields) => {
    const params = {
        body: {},
        headers: {},
        path: {},
        query: {},
    };
    const map = buildKeyMap(fields);
    let config;
    for (const [index, arg] of args.entries()) {
        if (fields[index]) {
            config = fields[index];
        }
        if (!config) {
            continue;
        }
        if ('in' in config) {
            if (config.key) {
                const field = map.get(config.key);
                const name = field.map || config.key;
                params[field.in][name] = arg;
            }
            else {
                params.body = arg;
            }
        }
        else {
            for (const [key, value] of Object.entries(arg ?? {})) {
                const field = map.get(key);
                if (field) {
                    const name = field.map || key;
                    params[field.in][name] = value;
                }
                else {
                    const extra = extraPrefixes.find(([prefix]) => key.startsWith(prefix));
                    if (extra) {
                        const [prefix, slot] = extra;
                        params[slot][key.slice(prefix.length)] = value;
                    }
                    else {
                        for (const [slot, allowed] of Object.entries(config.allowExtra ?? {})) {
                            if (allowed) {
                                params[slot][key] = value;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    stripEmptySlots(params);
    return params;
};
//# sourceMappingURL=params.js.map