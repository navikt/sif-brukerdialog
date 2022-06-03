import { ApplicationType } from '../types/ApplicationType';
import { getEnvironmentVariable } from '../utils/envUtils';

interface RouteConfig {
    UTILGJENGELIG_ROUTE: string;
    APPLICATION_ROUTE_PREFIX: string;
    ERROR_PAGE_ROUTE: string;
    WELCOMING_PAGE_ROUTE: string;
    APPLICATION_SENDT_ROUTE: string;
    IKKE_TILGANG_PAGE: string;
}

export const getRouteConfig = (søknadstype: ApplicationType): RouteConfig => {
    return {
        UTILGJENGELIG_ROUTE: '/utilgjengelig',
        APPLICATION_ROUTE_PREFIX: `/${søknadstype}`,
        ERROR_PAGE_ROUTE: `/${søknadstype}/feil`,
        WELCOMING_PAGE_ROUTE: `/${søknadstype}/velkommen`,
        APPLICATION_SENDT_ROUTE: `/${søknadstype}/dokumenter-sendt`,
        IKKE_TILGANG_PAGE: `/${søknadstype}/ikke-tilgang`,
    };
};

export const getRouteUrl = (route: string): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
