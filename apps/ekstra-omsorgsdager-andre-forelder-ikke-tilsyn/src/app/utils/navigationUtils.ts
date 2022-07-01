import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import { History } from 'history';
import AppRoutes, { getRouteUrl } from '../config/routeConfig';

/** Hard redirect enforcing page reload */
const relocateTo = (url: string) => {
    window.location.assign(url);
};

/** Simple route change, no page reload */
export const navigateTo = (route: string, history: History) => history.push(route);

export const relocateToLoginPage = () => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNavFrontpage = () => relocateTo('https://www.nav.no/');
export const relocateToSoknad = () => relocateTo(getRouteUrl(AppRoutes.SOKNAD));

export const navigateToSoknadFrontpage = (history: History) => navigateTo(AppRoutes.SOKNAD, history);
export const navigateToErrorPage = (history: History) => navigateTo(AppRoutes.ERROR, history);
export const navigateToKvitteringPage = (history: History) => navigateTo(AppRoutes.SOKNAD_SENT, history);
