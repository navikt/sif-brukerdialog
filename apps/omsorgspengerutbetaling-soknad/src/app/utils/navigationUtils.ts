import { getCommonEnv } from '@navikt/sif-common-env';
import { SøknadRoutes } from '../types/SøknadRoutes';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${getCommonEnv().PUBLIC_PATH}${route}`;
};

export const relocateToWelcomePage = () => {
    relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
};
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToLoginPage = () => relocateTo(getCommonEnv().SIF_PUBLIC_LOGIN_URL);
export const relocateToMinSide = () => relocateTo(getCommonEnv().SIF_PUBLIC_MINSIDE_URL);
