const trimLeadingSlashes = (value: string): string => {
    let index = 0;
    while (index < value.length && value[index] === '/') {
        index += 1;
    }
    return value.slice(index);
};

const trimTrailingSlashes = (value: string): string => {
    let end = value.length;
    while (end > 0 && value[end - 1] === '/') {
        end -= 1;
    }
    return value.slice(0, end);
};

export const normalizeRouteSegment = (route: string): string => {
    return trimTrailingSlashes(trimLeadingSlashes(route));
};

const normalizeBasePath = (basePath: string): string => {
    const trimmed = trimTrailingSlashes(basePath);
    return trimmed.length > 0 ? trimmed : '/';
};

export const buildStepPath = (basePath: string, route: string): string => {
    const normalizedBasePath = normalizeBasePath(basePath);
    const normalizedRoute = normalizeRouteSegment(route);

    if (!normalizedRoute) {
        return normalizedBasePath;
    }

    if (normalizedBasePath === '/') {
        return `/${normalizedRoute}`;
    }

    return `${normalizedBasePath}/${normalizedRoute}`;
};
