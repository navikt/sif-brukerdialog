import { ApplicationType } from '../types/ApplicationType';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

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

export const getApplicationRoute = (søknadstype: ApplicationType) => `/${søknadstype}/melding`;

export const getRouteConfig = (søknadstype: ApplicationType): RouteConfig => {
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

export const getAbsoluteUrlForRoute = (route: string): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
