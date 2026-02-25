import { useSøker } from '../../api/hooks/useSøker';
import ErrorPage from '../../pages/HentAppInfoErrorPage';
import UngLoadingPage from '../../pages/LoadingPage';
import { logFaroError } from '../../utils/faroUtils';
import { ApiErrorKey, useAnalyticsInstance } from '../../analytics/analytics';
import SøknadApp from '../../søknad/SøknadApp';
import { NoAccessPage } from '@navikt/sif-common-soknad-ds';

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

        if (error.status === 403) {
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
