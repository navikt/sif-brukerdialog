import { commonEnv } from '@navikt/sif-common-env';

enum RouteConfig {
    UTILGJENGELIG_ROUTE = '/utilgjengelig',
    SØKNAD_ROUTE_PREFIX = '/soknad',
    ERROR_PAGE_ROUTE = '/soknad/feil',
    WELCOMING_PAGE_ROUTE = '/soknad/velkommen',
    SØKNAD_SENDT_ROUTE = '/soknad/soknad-sendt',
}

export const getRouteUrl = (route: RouteConfig): string => {
    const publicPath = commonEnv.PUBLIC_PATH;
    return `${publicPath}${route}`;
};

export default RouteConfig;
