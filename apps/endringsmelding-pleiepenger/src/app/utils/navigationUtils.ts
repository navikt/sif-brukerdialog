import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { appEnv } from './appEnv';

const { SIF_PUBLIC_DOMAIN_URL, PUBLIC_PATH, SIF_PUBLIC_INNSYN_URL, SIF_PUBLIC_MINSIDE_URL, SIF_PUBLIC_LOGIN_URL } =
    appEnv;

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${SIF_PUBLIC_DOMAIN_URL}${PUBLIC_PATH}${route}`;
};

export const relocateToWelcomePage = () => relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
export const relocateToLoginPage = () => relocateTo(SIF_PUBLIC_LOGIN_URL);
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToDinePleiepenger = (): void => relocateTo(SIF_PUBLIC_INNSYN_URL);
export const relocateToMinSide = (): void => relocateTo(SIF_PUBLIC_MINSIDE_URL);
