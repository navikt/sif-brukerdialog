import { SøknadRoutes } from '../types/SøknadRoutes';
import { appEnv } from './appEnv';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${appEnv.PUBLIC_PATH}${route}`;
};

export const relocateToWelcomePage = () => {
    relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
};
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToLoginPage = () => relocateTo(appEnv.SIF_PUBLIC_LOGIN_URL);
export const relocateToMinSide = () => relocateTo(appEnv.SIF_PUBLIC_MINSIDE_URL);
