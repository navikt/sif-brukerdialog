import { useEffect, useState } from 'react';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { RequestStatus } from '../types/RequestStatus';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';
import { hentBarn, hentSøker } from '@navikt/sif-common-query';

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
        søknadsdata: {},
        ...lagretSøknadStateToUse,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const søker = await hentSøker();
            const barn = await hentBarn();
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
