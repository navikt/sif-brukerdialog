import { useEffect, useState } from 'react';
import { fetchBarn, fetchSøker } from '@navikt/sif-common-api';
import { isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { SØKNAD_VERSJON } from '../constants/SØKNAD_VERSJON';
import { Opplæringsinstitusjon } from '../types/Opplæringsinstitusjon';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { opplæringsinstitusjonService } from './opplæringsinstitusjonService';
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
    opplæringsinstitusjoner: Opplæringsinstitusjon[],
    lagretSøknadState: MellomlagringData,
): Promise<SøknadInitialData> => {
    const isValid = mellomlagringService.isMellomlagringValid(lagretSøknadState, { søker });
    if (!isValid) {
        await mellomlagringService.purge();
    }
    const lagretSøknadStateToUse = isValid ? lagretSøknadState : defaultSøknadState;
    return Promise.resolve({
        versjon: SØKNAD_VERSJON,
        søknadsdata: {},
        ...lagretSøknadStateToUse,
        søker,
        opplæringsinstitusjoner,
        registrerteBarn,
    });
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, registrerteBarn, opplæringsinstitusjoner, lagretSøknadState] = await Promise.all([
                fetchSøker(),
                fetchBarn(),
                opplæringsinstitusjonService.fetch(),
                mellomlagringService.fetch(),
            ]);
            console.log(opplæringsinstitusjoner);
            setInitialData({
                status: RequestStatus.success,
                data: await getSøknadInitialData(søker, registrerteBarn, opplæringsinstitusjoner, lagretSøknadState),
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
