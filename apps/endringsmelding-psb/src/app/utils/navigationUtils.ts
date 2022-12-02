import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';

const relocateTo = (url: string): void => {
    /** Hard redirect enforcing page reload */
    window.location.assign(url);
};

const getSøknadRouteURL = (route: SøknadRoutes) => {
    return `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;
};

export const relocateToLoginPage = () => relocateTo(getEnvironmentVariable('LOGIN_URL'));
export const relocateToNoAccessPage = (): void => relocateTo(getSøknadRouteURL(SøknadRoutes.IKKE_TILGANG));
