import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useState } from 'react';

import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { initialSøknadsdata } from '../søknad/context/reducer/søknadReducer';
import { RequestStatus } from '../types/RequestStatus';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';

export type SøknadInitialData = SøknadContextState;

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    data: SøknadInitialData;
};

type SøknadInitialFailed = {
    status: RequestStatus.error;
    error: unknown;
};

type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

type SøknadInitialNotLoggedIn = {
    status: RequestStatus.redirectingToLogin;
};

type SøknadNoAccess = {
    status: RequestStatus.noAccess;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialFailed
    | SøknadInitialLoading
    | SøknadNoAccess
    | SøknadInitialNotLoggedIn;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const getSøknadInitialData = async (
    søker: Søker,
    registrerteBarn: RegistrertBarn[],
    lagretSøknadState: SøknadStatePersistence,
): Promise<SøknadInitialData> => {
    const isValid = isPersistedSøknadStateValid(lagretSøknadState, { søker });

    if (!isValid) {
        await søknadStateEndpoint.purge();
    }
    const lagretSøknadStateToUse = isValid ? lagretSøknadState : defaultSøknadState;
    return Promise.resolve({
        versjon: MELLOMLAGRING_VERSJON,
        søker,
        registrerteBarn,
        søknadsdata: initialSøknadsdata,
        ...lagretSøknadStateToUse,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const søker = await fetchSøker();
            const barn = await fetchBarn();
            const lagretSøknadState = await søknadStateEndpoint.fetch();
            setInitialData({
                status: RequestStatus.success,
                data: await getSøknadInitialData(søker, barn, lagretSøknadState),
            });
        } catch (error: any) {
            if (isUnauthorized(error)) {
                setInitialData({
                    status: RequestStatus.redirectingToLogin,
                });
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.noAccess,
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

    useEffectOnce(() => {
        fetch();
    });

    return initialData;
}

export default useSøknadInitialData;
