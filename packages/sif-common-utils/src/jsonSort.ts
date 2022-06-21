export const jsonSort = (json: any): any => {
    function isObject(v: any) {
        return '[object Object]' === Object.prototype.toString.call(v);
    }
    const sort = (o: any): any => {
        if (Array.isArray(o)) {
            return o.sort().map(sort);
        } else if (isObject(o)) {
            return Object.keys(o)
                .sort()
                .reduce((a, k) => {
                    (a as any)[k] = sort(o[k]);
                    return a;
                }, {});
        }
        return o;
    };
    return sort(json);
};
