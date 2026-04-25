export const convertNullToUndefined = (obj: any): any => {
    if (obj === null) {
        return undefined;
    }
    if (Array.isArray(obj)) {
        return obj.map(convertNullToUndefined);
    }
    if (typeof obj === 'object') {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertNullToUndefined(value)]));
    }
    return obj;
};
