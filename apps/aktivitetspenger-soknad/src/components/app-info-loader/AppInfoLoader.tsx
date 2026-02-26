import { useSøker } from '@navikt/sif-common-query';
import { NoAccessPage } from '@navikt/sif-common-soknad-ds';
import { isAxiosError } from 'axios';

import { ApiErrorKey, useAnalyticsInstance } from '../../analytics/analytics';
import ErrorPage from '../../pages/HentAppInfoErrorPage';
import UngLoadingPage from '../../pages/LoadingPage';
import SøknadApp from '../../søknad/SøknadApp';
import { logFaroError } from '../../utils/faroUtils';

const AppInfoLoader = () => {
    const søker = useSøker();
    const { logApiError } = useAnalyticsInstance();

    const isLoading = søker.isLoading;
    const isError = søker.isError;

    if (isLoading) {
        return <UngLoadingPage />;
    }

    if (isError) {
        const { error } = søker;
        logApiError(ApiErrorKey.oppstartsinfo, { error });

        if (isAxiosError(error) && error.response?.status === 403) {
            return <NoAccessPage tittelIntlKey="application.title" />;
        }
        return <ErrorPage error="Feil ved henting av info" />;
    }

    if (!søker.data) {
        logApiError(ApiErrorKey.oppstartsinfo, { info: 'Ingen data lastet' });
        logFaroError(
            'AppInfoLoader.ManglendeData',
            JSON.stringify({
                søkerHarData: søker.data !== undefined,
            }),
        );
        return <ErrorPage error="Ingen data lastet" />;
    }

    return <SøknadApp søker={søker.data} />;
};

export default AppInfoLoader;
