import { NavigateFunction } from 'react-router';
import RouteConfig, { getRouteUrl } from '../config/routeConfig';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

export const userIsCurrentlyOnErrorPage = () => {
    return window.location.pathname === getRouteUrl(RouteConfig.ERROR_PAGE_ROUTE);
};

/** Hard redirect enforcing page reload */
const relocateTo = (url: string): void => {
    window.location.assign(url);
};

export const relocateToLoginPage = (): void => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNavFrontpage = (): void => relocateTo('https://www.nav.no/');
export const relocateToSoknad = (): void => relocateTo(getRouteUrl(RouteConfig.SØKNAD_ROUTE_PREFIX));
export const relocateToMinSide = () => relocateTo(getEnvironmentVariable('MIN_SIDE_URL'));

export const navigateToErrorPage = (navigate: NavigateFunction): void => {
    navigate(RouteConfig.ERROR_PAGE_ROUTE);
};
