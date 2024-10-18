import { useEffect, useState } from 'react';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { SØKNAD_VERSJON } from '../constants/SØKNAD_VERSJON';
import { RequestStatus } from '../types/RequestStatus';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { MellomlagringData, mellomlagringService } from './mellomlagringService';

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
    lagretSøknadState: MellomlagringData,
): Promise<SøknadInitialData> => {
    const isValid = mellomlagringService.isMellomlagringValid(lagretSøknadState, { søker, registrerteBarn });
    if (!isValid) {
        await mellomlagringService.purge();
    }
    const lagretSøknadStateToUse = isValid ? lagretSøknadState : defaultSøknadState;
    return Promise.resolve({
        versjon: SØKNAD_VERSJON,
        søknadsdata: {},
        ...lagretSøknadStateToUse,
        søker,
        registrerteBarn,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const søker = await fetchSøker();
            const registrerteBarn = await fetchBarn();
            const lagretSøknadState = await mellomlagringService.fetch();
            setInitialData({
                status: RequestStatus.success,
                data: await getSøknadInitialData(søker, registrerteBarn, lagretSøknadState),
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
