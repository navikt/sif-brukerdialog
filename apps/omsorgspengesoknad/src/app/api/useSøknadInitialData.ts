import { useEffect, useState } from 'react';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { hentBarn, hentSøker } from '@navikt/sif-common-query';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { RequestStatus } from '../types/RequestStatus';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { søknadMellomlagring } from '../utils/søknadMellomlagring';

export type SøknadInitialData = SøknadContextState;

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    data: SøknadInitialData;
};

type SøknadInitialFailed = {
    status: RequestStatus.error;
    error: any;
};

type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

type SøknadInitialNotLoggedIn = {
    status: RequestStatus.redirectingToLogin;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialFailed
    | SøknadInitialLoading
    | SøknadInitialNotLoggedIn;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, registrerteBarn] = await Promise.all([hentSøker(), hentBarn()]);
            const mellomlagring = await søknadMellomlagring.hent({ søker, registrerteBarn, MELLOMLAGRING_VERSJON });
            setInitialData({
                status: RequestStatus.success,
                data: {
                    versjon: MELLOMLAGRING_VERSJON,
                    søker,
                    registrerteBarn,
                    søknadsdata: {},
                    ...(mellomlagring || defaultSøknadState),
                },
            });
        } catch (error: any) {
            if (isUnauthorized(error)) {
                setInitialData({
                    status: RequestStatus.redirectingToLogin,
                });
            } else {
                appSentryLogger.logError('fetchInitialData', error);
                setInitialData({
                    status: RequestStatus.error,
                    error,
                });
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return initialData;
}

export default useSøknadInitialData;
