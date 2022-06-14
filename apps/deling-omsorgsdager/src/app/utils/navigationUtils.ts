import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import { History } from 'history';
import AppRoutes, { getRouteUrl } from '../config/routeConfig';

/** Hard redirect enforcing page reload */
const relocateTo = (url: string): void => {
    window.location.assign(url);
};

/** Simple route change, no page reload */
export const navigateTo = (route: string, history: History): void => history.push(route);

export const relocateToLoginPage = (): void => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNavFrontpage = (): void => relocateTo('https://www.nav.no/');
export const relocateToSoknad = (): void => relocateTo(getRouteUrl(AppRoutes.SOKNAD));

export const navigateToSoknadFrontpage = (history: History): void => navigateTo(AppRoutes.SOKNAD, history);
export const navigateToErrorPage = (history: History): void => navigateTo(AppRoutes.ERROR, history);
export const navigateToKvitteringPage = (history: History): void => navigateTo(AppRoutes.SOKNAD_SENT, history);
