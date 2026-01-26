import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useState } from 'react';

import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { RequestStatus } from '../types/RequestStatus';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { fetchInstitusjoner, Institusjon } from './institusjonService';
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
    institusjoner: Institusjon[],
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
        institusjoner,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, registrerteBarn, institusjoner, lagretSøknadState] = await Promise.all([
                fetchSøker(),
                fetchBarn(),
                fetchInstitusjoner(),
                mellomlagringService.fetch(),
            ]);
            setInitialData({
                status: RequestStatus.success,
                data: await getSøknadInitialData(søker, registrerteBarn, institusjoner, lagretSøknadState),
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
