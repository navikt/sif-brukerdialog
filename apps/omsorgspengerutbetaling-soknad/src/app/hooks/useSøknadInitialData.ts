import { fetchBarn, fetchSøker, isUnauthorized, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isForbidden } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useEffect, useState } from 'react';

import { MellomlagringData, mellomlagringService } from '../api/mellomlagringService';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { RequestStatus } from '../types/RequestStatus';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToLoginPage } from '../utils/navigationUtils';

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

type SøknadInitialNoAccess = {
    status: RequestStatus.noAccess;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialFailed
    | SøknadInitialLoading
    | SøknadInitialNoAccess
    | SøknadInitialNotLoggedIn;

export const defaultSøknadState: Partial<SøknadContextState> = {
    søknadRoute: SøknadRoutes.VELKOMMEN,
};

const getSøknadInitialData = async (
    søker: Søker,
    registrerteBarn: RegistrertBarn[],
    lagretSøknadState: MellomlagringData,
): Promise<SøknadInitialData> => {
    const isValid = mellomlagringService.isMellomlagringValid(lagretSøknadState, { søker });

    if (!isValid) {
        await mellomlagringService.purge();
    }
    const lagretSøknadStateToUse = isValid ? lagretSøknadState : defaultSøknadState;
    return Promise.resolve({
        versjon: MELLOMLAGRING_VERSJON,
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
            const barn = await fetchBarn();
            const lagretSøknadState = await mellomlagringService.fetch();
            const data = await getSøknadInitialData(søker, barn, lagretSøknadState);
            setInitialData({
                status: RequestStatus.success,
                data,
            });
        } catch (error: any) {
            if (isUnauthorized(error)) {
                relocateToLoginPage();
            } else if (isForbidden(error)) {
                setInitialData({ status: RequestStatus.noAccess });
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
