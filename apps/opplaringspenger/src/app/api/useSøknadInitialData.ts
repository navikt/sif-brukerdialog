import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { SØKNAD_VERSJON } from '../constants/SØKNAD_VERSJON';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { RequestStatus } from '../types/RequestStatus';
import { Søker } from '../types/Søker';
import { SøknadContextState } from '../types/SøknadContextState';
import { SøknadRoutes } from '../types/SøknadRoutes';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToLoginPage, relocateToNoAccessPage } from '../utils/navigationUtils';
import søknadStateEndpoint, {
    isPersistedSøknadStateValid,
    SøknadStatePersistence,
} from './endpoints/søknadStateEndpoint';
import registrerteBarnEndpoint from './endpoints/registrerteBarnEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';

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
    registrerteBarn: RegistrertBarn[],
    lagretSøknadState: SøknadStatePersistence
): Promise<SøknadInitialData> => {
    const isValid = isPersistedSøknadStateValid(lagretSøknadState, { søker, registrerteBarn });

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
            const [søker, registrerteBarn, lagretSøknadState] = await Promise.all([
                søkerEndpoint.fetch(),
                registrerteBarnEndpoint.fetch(),
                søknadStateEndpoint.fetch(),
            ]);

            setInitialData({
                status: RequestStatus.success,
                data: await getSøknadInitialData(søker, registrerteBarn, lagretSøknadState),
            });
            return Promise.resolve();
        } catch (error: any) {
            if (isUnauthorized(error)) {
                relocateToLoginPage();
                return;
            }
            if (isForbidden(error)) {
                relocateToNoAccessPage();
                return;
            }
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
