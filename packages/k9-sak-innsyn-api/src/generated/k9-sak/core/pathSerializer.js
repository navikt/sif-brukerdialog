export const separatorArrayExplode = (style) => {
    switch (style) {
        case 'label':
            return '.';
        case 'matrix':
            return ';';
        case 'simple':
            return ',';
        default:
            return '&';
    }
};
export const separatorArrayNoExplode = (style) => {
    switch (style) {
        case 'form':
            return ',';
        case 'pipeDelimited':
            return '|';
        case 'spaceDelimited':
            return '%20';
        default:
            return ',';
    }
};
export const separatorObjectExplode = (style) => {
    switch (style) {
        case 'label':
            return '.';
        case 'matrix':
            return ';';
        case 'simple':
            return ',';
        default:
            return '&';
    }
};
export const serializeArrayParam = ({ allowReserved, explode, name, style, value, }) => {
    if (!explode) {
        const joinedValues = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
        switch (style) {
            case 'label':
                return `.${joinedValues}`;
            case 'matrix':
                return `;${name}=${joinedValues}`;
            case 'simple':
                return joinedValues;
            default:
                return `${name}=${joinedValues}`;
        }
    }
    const separator = separatorArrayExplode(style);
    const joinedValues = value
        .map((v) => {
        if (style === 'label' || style === 'simple') {
            return allowReserved ? v : encodeURIComponent(v);
        }
        return serializePrimitiveParam({
            allowReserved,
            name,
            value: v,
        });
    })
        .join(separator);
    return style === 'label' || style === 'matrix'
        ? separator + joinedValues
        : joinedValues;
};
export const serializePrimitiveParam = ({ allowReserved, name, value, }) => {
    if (value === undefined || value === null) {
        return '';
    }
    if (typeof value === 'object') {
        throw new Error('Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.');
    }
    return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
};
export const serializeObjectParam = ({ allowReserved, explode, name, style, value, valueOnly, }) => {
    if (value instanceof Date) {
        return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
    }
    if (style !== 'deepObject' && !explode) {
        let values = [];
        Object.entries(value).forEach(([key, v]) => {
            values = [
                ...values,
                key,
                allowReserved ? v : encodeURIComponent(v),
            ];
        });
        const joinedValues = values.join(',');
        switch (style) {
            case 'form':
                return `${name}=${joinedValues}`;
            case 'label':
                return `.${joinedValues}`;
            case 'matrix':
                return `;${name}=${joinedValues}`;
            default:
                return joinedValues;
        }
    }
    const separator = separatorObjectExplode(style);
    const joinedValues = Object.entries(value)
        .map(([key, v]) => serializePrimitiveParam({
        allowReserved,
        name: style === 'deepObject' ? `${name}[${key}]` : key,
        value: v,
    }))
        .join(separator);
    return style === 'label' || style === 'matrix'
        ? separator + joinedValues
        : joinedValues;
};
//# sourceMappingURL=pathSerializer.js.map