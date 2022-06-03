import { History } from 'history';
import { getRouteConfig, getRouteUrl } from '../config/routeConfig';
import { ApplicationType } from '../types/ApplicationType';
import { getEnvironmentVariable } from './envUtils';

const getLoginUrl = (søknadstype: ApplicationType) => `${getEnvironmentVariable('LOGIN_URL')}/${søknadstype}`;

export const redirectTo = (route: string) => window.location.assign(route);
export const navigateTo = (route: string, history: History) => history.push(route);
export const navigateToErrorPage = (søknadstype: ApplicationType, history?: History) => {
    const routeConfig = getRouteConfig(søknadstype);
    if (history) {
        history.push(routeConfig.ERROR_PAGE_ROUTE);
    } else {
        window.location.assign(getRouteUrl(routeConfig.ERROR_PAGE_ROUTE));
    }
};

export const navigateToLoginPage = (søknadstype: ApplicationType) => window.location.assign(getLoginUrl(søknadstype));
export const navigateToWelcomePage = (søknadstype: ApplicationType) =>
    window.location.assign(getRouteUrl(getRouteConfig(søknadstype).WELCOMING_PAGE_ROUTE));
export const userIsCurrentlyOnErrorPage = (søknadstype: ApplicationType) =>
    window.location.pathname === getRouteUrl(getRouteConfig(søknadstype).ERROR_PAGE_ROUTE);
