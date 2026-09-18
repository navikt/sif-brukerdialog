import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { appEnv } from './appEnv';

const { SIF_PUBLIC_DOMAIN_URL, PUBLIC_PATH, SIF_PUBLIC_INNSYN_URL, SIF_PUBLIC_MINSIDE_URL, SIF_PUBLIC_LOGIN_URL } =
    appEnv;

const isGitHubPages = __IS_GITHUB_PAGES__;

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    const baseUrl = `${SIF_PUBLIC_DOMAIN_URL}${PUBLIC_PATH}`;
    return isGitHubPages ? `${baseUrl}/#${route}` : `${baseUrl}${route}`;
};

export const relocateToWelcomePage = () => relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
export const relocateToLoginPage = () => relocateTo(SIF_PUBLIC_LOGIN_URL);
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToDinePleiepenger = (): void => relocateTo(SIF_PUBLIC_INNSYN_URL);
export const relocateToMinSide = (): void => relocateTo(SIF_PUBLIC_MINSIDE_URL);
