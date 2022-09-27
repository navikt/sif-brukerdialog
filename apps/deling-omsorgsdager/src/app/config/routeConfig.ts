import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

enum AppRoutes {
    NOT_OPEN = '/utilgjengelig',
    SOKNAD = '/melding',
    SOKNAD_SENT = '/melding-sendt',
    ERROR = '/feil',
}

export const getKvitteringRoute = () => {
    return `${AppRoutes.SOKNAD}${AppRoutes.SOKNAD_SENT}`;
};

export const getRouteUrl = (route: AppRoutes): string => `${getEnvironmentVariable('PUBLIC_PATH')}${route}`;

export default AppRoutes;
