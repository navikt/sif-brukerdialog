import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

enum RouteConfig {
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    SØKNAD_ROUTE_PREFIX = '/soknad',
    ERROR_PAGE_ROUTE = '/soknad/feil',
    WELCOMING_PAGE_ROUTE = '/soknad/velkommen',
    SØKNAD_SENDT_ROUTE = '/soknad/soknad-sendt',
}

export const getRouteUrl = (route: RouteConfig): string => {
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    return `${publicPath}${route}`;
};

export default RouteConfig;
