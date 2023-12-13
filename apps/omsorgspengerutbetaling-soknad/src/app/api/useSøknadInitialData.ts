import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useEffect, useState } from 'react';
import { SØKNAD_VERSJON } from '../constants/SØKNAD_VERSJON';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import barnEndpoint from './endpoints/barnEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
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
        versjon: SØKNAD_VERSJON,
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
            const søker = await søkerEndpoint.fetch();
            const barn = await barnEndpoint.fetch();
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
