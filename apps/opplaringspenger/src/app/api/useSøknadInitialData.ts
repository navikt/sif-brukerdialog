import { useEffect, useState } from 'react';
import { SØKNAD_VERSJON } from '../constants/SØKNAD_VERSJON';
import { Institusjon } from '../types/Institusjon';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import institusjonEndpoint from './endpoints/institusjonEndpoint';
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

export type SøknadInitialDataState = SøknadInitialSuccess | SøknadInitialFailed | SøknadInitialLoading;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const getSøknadInitialData = async (
    søker: Søker,
    institusjoner: Institusjon[],
    lagretSøknadState: SøknadStatePersistence
): Promise<SøknadInitialData> => {
    const isValid = isPersistedSøknadStateValid(lagretSøknadState, { søker });

    if (!isValid) {
        await søknadStateEndpoint.purge();
    }
    const lagretSøknadStateToUse = isValid ? lagretSøknadState : defaultSøknadState;
    return Promise.resolve({
        versjon: SØKNAD_VERSJON,
        søker,
        institusjoner,
        søknadsdata: {},
        ...lagretSøknadStateToUse,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, institusjoner, lagretSøknadState] = await Promise.all([
                søkerEndpoint.fetch(),
                institusjonEndpoint.fetch(),
                søknadStateEndpoint.fetch(),
            ]);

            setInitialData({
                status: RequestStatus.success,
                data: await getSøknadInitialData(søker, institusjoner, lagretSøknadState),
            });
            return Promise.resolve();
        } catch (error: any) {
            appSentryLogger.logError('fetchInitialData', error);
            setInitialData({
                status: RequestStatus.error,
                error,
            });
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return initialData;
}

export default useSøknadInitialData;
