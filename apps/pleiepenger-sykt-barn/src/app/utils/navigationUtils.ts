import { NavigateFunction } from 'react-router';
import RouteConfig from '../config/routeConfig';
import routeConfig, { getRouteUrl } from '../config/routeConfig';

// import appSentryLogger from './appSentryLogger';
import { getEnvironmentVariable } from './envUtils';
import { StepID } from '../types/StepID';

export const userIsCurrentlyOnErrorPage = () => {
    return window.location.pathname === getRouteUrl(routeConfig.ERROR_PAGE_ROUTE);
};

/** Hard redirect enforcing page reload */
const relocateTo = (url: string): void => {
    window.location.assign(url);
};

/** Simple route change, no page reload */
export const navigateTo = (route: string, navigate: NavigateFunction): void => {
    navigate(route);
};
export const navigateToSoknadStep = (step: StepID, navigate: NavigateFunction): void => {
    // eslint-disable-next-line no-console
    console.log(step, navigate);

    /** TODO */
    // navigateTo(getStepRou)
}; //history.push(`${step}`);

export const relocateToLoginPage = (): void => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNavFrontpage = (): void => relocateTo('https://www.nav.no/');
export const relocateToSoknad = (): void => relocateTo(getRouteUrl(RouteConfig.SØKNAD_ROUTE_PREFIX));
export const relocateToDinePleiepenger = (): void => relocateTo(getEnvironmentVariable('INNSYN_URL'));

export const navigateToErrorPage = (navigate: NavigateFunction): void => {
    navigateTo(RouteConfig.ERROR_PAGE_ROUTE, navigate);
};
