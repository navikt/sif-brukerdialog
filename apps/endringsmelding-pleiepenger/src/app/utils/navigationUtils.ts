import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    const DOMAIN_URL = getEnvironmentVariable('DOMAIN_URL') || '';
    const publicPath = getEnvironmentVariable('PUBLIC_PATH');
    return `${DOMAIN_URL}${publicPath}${route}`;
};

export const relocateToWelcomePage = () => relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
export const relocateToLoginPage = () => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToDinePleiepenger = (): void => relocateTo(getEnvironmentVariable('INNSYN_URL'));
export const relocateToMinSide = (): void => relocateTo(getEnvironmentVariable('MINSIDE_URL'));
