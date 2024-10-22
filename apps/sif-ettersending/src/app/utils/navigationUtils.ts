import { NavigateFunction } from 'react-router-dom';
import { getAbsoluteUrlForRoute, getRouteConfig } from '../config/routeConfig';
import { Søknadstype } from '../types/Søknadstype';
import { appEnv } from './appEnv';

const { SIF_PUBLIC_LOGIN_URL, SIF_PUBLIC_MINSIDE_URL } = appEnv;

const getLoginUrl = (søknadstype: Søknadstype) => `${SIF_PUBLIC_LOGIN_URL}/${søknadstype}`;

export const redirectTo = (route: string) => window.location.assign(route);
export const navigateToErrorPage = (søknadstype: Søknadstype, navigate?: NavigateFunction) => {
    const routeConfig = getRouteConfig(søknadstype);
    if (navigate) {
        navigate(routeConfig.ERROR_PAGE_ROUTE);
    } else {
        window.location.assign(getAbsoluteUrlForRoute(routeConfig.ERROR_PAGE_ROUTE));
    }
};

export const navigateToKvitteringPage = (søknadstype: Søknadstype, navigate: NavigateFunction) =>
    navigate(getRouteConfig(søknadstype).APPLICATION_SENDT_ROUTE);

export const navigateToLoginPage = (søknadstype: Søknadstype) => window.location.assign(getLoginUrl(søknadstype));
export const navigateToWelcomePage = (søknadstype: Søknadstype) =>
    window.location.assign(getAbsoluteUrlForRoute(getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE));
export const userIsCurrentlyOnErrorPage = (søknadstype: Søknadstype) => {
    const absoluteUrl = getAbsoluteUrlForRoute(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);
    return window.location.pathname === absoluteUrl;
};

export const relocateToNavFrontpage = (): void => redirectTo('https://www.nav.no/');

export const relocateToMinSide = () => redirectTo(SIF_PUBLIC_MINSIDE_URL);
