const serializeFormDataPair = (data, key, value) => {
    if (typeof value === 'string' || value instanceof Blob) {
        data.append(key, value);
    }
    else {
        data.append(key, JSON.stringify(value));
    }
};
const serializeUrlSearchParamsPair = (data, key, value) => {
    if (typeof value === 'string') {
        data.append(key, value);
    }
    else {
        data.append(key, JSON.stringify(value));
    }
};
export const formDataBodySerializer = {
    bodySerializer: (body) => {
        const data = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }
            if (Array.isArray(value)) {
                value.forEach((v) => serializeFormDataPair(data, key, v));
            }
            else {
                serializeFormDataPair(data, key, value);
            }
        });
        return data;
    },
};
export const jsonBodySerializer = {
    bodySerializer: (body) => JSON.stringify(body, (_key, value) => typeof value === 'bigint' ? value.toString() : value),
};
export const urlSearchParamsBodySerializer = {
    bodySerializer: (body) => {
        const data = new URLSearchParams();
        Object.entries(body).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }
            if (Array.isArray(value)) {
                value.forEach((v) => serializeUrlSearchParamsPair(data, key, v));
            }
            else {
                serializeUrlSearchParamsPair(data, key, value);
            }
        });
        return data.toString();
    },
};
//# sourceMappingURL=bodySerializer.js.map