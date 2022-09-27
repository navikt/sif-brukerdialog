import { NavigateFunction } from 'react-router-dom';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { getRouteConfig, getRouteUrl } from '../config/routeConfig';
import { ApplicationType } from '../types/ApplicationType';

const getLoginUrl = (søknadstype: ApplicationType) => `${getEnvironmentVariable('LOGIN_URL')}/${søknadstype}`;

export const redirectTo = (route: string) => window.location.assign(route);
export const navigateTo = (route: string, navigate: NavigateFunction) => navigate(route);
export const navigateToErrorPage = (søknadstype: ApplicationType, navigate?: NavigateFunction) => {
    const routeConfig = getRouteConfig(søknadstype);
    if (navigate) {
        navigate(routeConfig.ERROR_PAGE_ROUTE);
    } else {
        window.location.assign(getRouteUrl(routeConfig.ERROR_PAGE_ROUTE));
    }
};

export const navigateToLoginPage = (søknadstype: ApplicationType) => window.location.assign(getLoginUrl(søknadstype));
export const navigateToWelcomePage = (søknadstype: ApplicationType) =>
    window.location.assign(getRouteUrl(getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE));
export const userIsCurrentlyOnErrorPage = (søknadstype: ApplicationType) =>
    window.location.pathname === getRouteUrl(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);
