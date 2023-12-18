import { NavigateFunction } from 'react-router-dom';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { getAbsoluteUrlForRoute, getRouteConfig } from '../config/routeConfig';
import { Søknadstype } from '../types/Søknadstype';

const getLoginUrl = (søknadstype: Søknadstype) => `${getEnvironmentVariable('LOGIN_URL')}/${søknadstype}`;

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
export const userIsCurrentlyOnErrorPage = (søknadstype: Søknadstype) =>
    window.location.pathname === getAbsoluteUrlForRoute(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);

export const relocateToNavFrontpage = (): void => redirectTo('https://www.nav.no/');

export const relocateToMinSide = () => redirectTo(getEnvironmentVariable('MIN_SIDE_URL'));
