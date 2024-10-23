import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { SøknadRoutes } from '../types/SøknadRoutes';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
};

export const relocateToWelcomePage = () => {
    relocateTo(getSøknadRouteURL(SøknadRoutes.VELKOMMEN));
};
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
export const relocateToLoginPage = () => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToMinSide = () => relocateTo(getEnvironmentVariable('MINSIDE_URL'));
