export const normalizeRouteSegment = (route: string): string => {
    return route.replace(/^\/+|\/+$/g, '');
};

const normalizeBasePath = (basePath: string): string => {
    const trimmed = basePath.replace(/\/+$/g, '');
    return trimmed.length > 0 ? trimmed : '/';
};

export const buildStepPath = (basePath: string, route: string): string => {
    const normalizedBasePath = normalizeBasePath(basePath);
    const normalizedRoute = normalizeRouteSegment(route);

    if (!normalizedRoute) {
        return normalizedBasePath;
    }

    return `${normalizedBasePath}/${normalizedRoute}`;
};
