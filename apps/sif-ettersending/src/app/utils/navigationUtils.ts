import { NavigateFunction } from 'react-router-dom';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { getRouteConfig, getAbsoluteUrlForRoute } from '../config/routeConfig';
import { ApplicationType } from '../types/ApplicationType';

const getLoginUrl = (søknadstype: ApplicationType) => `${getEnvironmentVariable('LOGIN_URL')}/${søknadstype}`;

export const redirectTo = (route: string) => window.location.assign(route);
export const navigateTo = (route: string, navigate: NavigateFunction) => navigate(route);
export const navigateToErrorPage = (søknadstype: ApplicationType, navigate?: NavigateFunction) => {
    const routeConfig = getRouteConfig(søknadstype);
    if (navigate) {
        navigate(routeConfig.ERROR_PAGE_ROUTE);
    } else {
        window.location.assign(getAbsoluteUrlForRoute(routeConfig.ERROR_PAGE_ROUTE));
    }
};

export const navigateToKvitteringPage = (søknadstype: ApplicationType, navigate: NavigateFunction) =>
    navigate(getAbsoluteUrlForRoute(getRouteConfig(søknadstype).APPLICATION_SENDT_ROUTE));

export const navigateToLoginPage = (søknadstype: ApplicationType) => window.location.assign(getLoginUrl(søknadstype));
export const navigateToWelcomePage = (søknadstype: ApplicationType) =>
    window.location.assign(getAbsoluteUrlForRoute(getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE));
export const userIsCurrentlyOnErrorPage = (søknadstype: ApplicationType) =>
    window.location.pathname === getAbsoluteUrlForRoute(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);

export const relocateToNavFrontpage = (): void => redirectTo('https://www.nav.no/');

export const relocateToApplication = (søknadstype: ApplicationType) =>
    redirectTo(getAbsoluteUrlForRoute(getRouteConfig(søknadstype).APPLICATION_ROUTE_PREFIX));
