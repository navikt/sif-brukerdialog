import { NavigateFunction } from 'react-router-dom';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import AppRoutes, { getRouteUrl } from '../config/routeConfig';

/** Hard redirect enforcing page reload */
const relocateTo = (url: string): void => {
    window.location.assign(url);
};

/** Simple route change, no page reload */
export const navigateTo = (route: string, navigate: NavigateFunction): void => navigate(route);

export const relocateToLoginPage = (): void => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNavFrontpage = (): void => relocateTo('https://www.nav.no/');
export const relocateToSoknad = (): void => relocateTo(getRouteUrl(AppRoutes.SOKNAD));

export const navigateToSoknadFrontpage = (navigate: NavigateFunction): void => navigateTo(AppRoutes.SOKNAD, navigate);
export const navigateToErrorPage = (navigate: NavigateFunction): void => navigateTo(AppRoutes.ERROR, navigate);
export const navigateToKvitteringPage = (navigate: NavigateFunction): void =>
    navigate(`${AppRoutes.SOKNAD}/${AppRoutes.SOKNAD_SENT}`, { replace: true });
