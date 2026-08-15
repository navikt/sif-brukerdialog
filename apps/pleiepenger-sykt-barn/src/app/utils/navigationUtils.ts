import RouteConfig, { getRouteUrl } from '../config/routeConfig';
import { appEnv } from '../env/appEnv';

const { PUBLIC_PATH, SIF_PUBLIC_MINSIDE_URL } = appEnv;

/** Hard redirect enforcing page reload */
const relocateTo = (url: string): void => {
    window.location.assign(url);
};

/** Uses current origin so login works across all ingresses (intern/ekstern/hostname) */
export const relocateToLoginPage = (): void =>
    relocateTo(`${window.location.origin}${PUBLIC_PATH}/oauth2/login?redirect=${PUBLIC_PATH}/soknad`);
export const relocateToNavFrontpage = (): void => relocateTo('https://www.nav.no/');
export const relocateToSoknad = (): void => relocateTo(getRouteUrl(RouteConfig.SØKNAD_ROUTE_PREFIX));
export const relocateToMinSide = () => relocateTo(SIF_PUBLIC_MINSIDE_URL);
