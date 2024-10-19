import { Søknadstype } from '../types/Søknadstype';
import { appEnv } from '../utils/appEnv';

interface RouteConfig {
    UTILGJENGELIG_ROUTE: string;
    APPLICATION_ROUTE_PREFIX: string;
    ERROR_PAGE_ROUTE: string;
    WELCOMING_PAGE_ROUTE: string;
    APPLICATION_SENDT_ROUTE: string;
    IKKE_TILGANG_PAGE: string;
}

export const APPLICATION_SENDT_PAGE = 'dokumenter-sendt';
export const ERROR_PAGE = 'feil';
export const WELCOME_PAGE = 'velkommen';

export const getApplicationRoute = (søknadstype: Søknadstype) => `/${søknadstype}/melding`;

export const getRouteConfig = (søknadstype: Søknadstype): RouteConfig => {
    const APPLICATION_ROUTE_PREFIX = getApplicationRoute(søknadstype);
    return {
        UTILGJENGELIG_ROUTE: '/utilgjengelig',
        IKKE_TILGANG_PAGE: `/ikke-tilgang`,
        APPLICATION_ROUTE_PREFIX,
        ERROR_PAGE_ROUTE: `${APPLICATION_ROUTE_PREFIX}/${ERROR_PAGE}`,
        WELCOMING_PAGE_ROUTE: `${APPLICATION_ROUTE_PREFIX}/${WELCOME_PAGE}`,
        APPLICATION_SENDT_ROUTE: `${APPLICATION_ROUTE_PREFIX}/${APPLICATION_SENDT_PAGE}`,
    };
};

export const getAbsoluteUrlForRoute = (route: string): string => `${appEnv.PUBLIC_PATH}${route}`;
