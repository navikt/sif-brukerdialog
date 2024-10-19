import { SøknadRoutes } from '../types/SøknadRoutes';
import { commonEnv, getRequiredEnv } from '@navikt/sif-common-env';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${commonEnv.PUBLIC_PATH}${route}`;
};

export const relocateToWelcomePage = () => {
    relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
};
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToLoginPage = () => relocateTo(getRequiredEnv('LOGIN_URL'));
export const relocateToMinSide = () => relocateTo(getRequiredEnv('MINSIDE_URL'));
