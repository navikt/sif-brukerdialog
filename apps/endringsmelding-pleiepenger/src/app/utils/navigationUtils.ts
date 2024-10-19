import { commonEnv } from '../../../../../packages/sif-common-env/src';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { appEnv } from './appEnv';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    const DOMAIN_URL = appEnv.DOMAIN_URL || '';
    const publicPath = commonEnv.PUBLIC_PATH;
    return `${DOMAIN_URL}${publicPath}${route}`;
};

export const relocateToWelcomePage = () => relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
export const relocateToLoginPage = () => relocateTo(commonEnv.SIF_PUBLIC_LOGIN_URL);
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToDinePleiepenger = (): void => relocateTo(appEnv.INNSYN_URL);
export const relocateToMinSide = (): void => relocateTo(appEnv.SIF_PUBLIC_MINSIDE_URL);
