import { NavigateFunction } from 'react-router';
import RouteConfig, { getRouteUrl } from '../config/routeConfig';
import { appEnv } from '../env/appEnv';

export const userIsCurrentlyOnErrorPage = () => {
    return window.location.pathname === getRouteUrl(RouteConfig.ERROR_PAGE_ROUTE);
};

/** Hard redirect enforcing page reload */
const relocateTo = (url: string): void => {
    window.location.assign(url);
};

export const relocateToLoginPage = (): void => relocateTo(appEnv.SIF_PUBLIC_LOGIN_URL);
export const relocateToNavFrontpage = (): void => relocateTo('https://www.nav.no/');
export const relocateToSoknad = (): void => relocateTo(getRouteUrl(RouteConfig.SØKNAD_ROUTE_PREFIX));
export const relocateToMinSide = () => relocateTo(appEnv.SIF_PUBLIC_MINSIDE_URL);

export const navigateToErrorPage = (navigate: NavigateFunction): void => {
    navigate(RouteConfig.ERROR_PAGE_ROUTE);
};
