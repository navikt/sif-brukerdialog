import { ApiError } from '@navikt/ung-common';
import { useSøker } from '../../api/hooks/useSøker';
import ErrorPage from '../../pages/HentAppInfoErrorPage';
import UngLoadingPage from '../../pages/LoadingPage';
import { logFaroError } from '../../utils/faroUtils';
import { ApiErrorKey, useAnalyticsInstance } from '../../analytics/analytics';
import SøknadApp from '../../søknad/SøknadApp';

const getErrorInfoToLog = (error: ApiError | null) => {
    if (!error || error === null) {
        return null;
    }
    const { context, message, type } = error;
    return { context, message, type };
};

const AppInfoLoader = () => {
    const søker = useSøker();
    const { logApiError } = useAnalyticsInstance();

    const isLoading = søker.isLoading;
    const error = søker.isError;

    if (isLoading) {
        return <UngLoadingPage />;
    }

    if (error) {
        const søkerError = getErrorInfoToLog(søker.error);
        logApiError(ApiErrorKey.oppstartsinfo, { søkerError });
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
