import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { SøknadContextState } from '../types/SøknadContextState';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToNoAccessPage } from '../utils/navigationUtils';
import mellomlagringEndpoint, {
    isMellomlagringValid,
    MELLOMLAGRING_VERSION,
    SøknadMellomlagring,
} from './endpoints/mellomlagringEndpoint';
import registrerteBarnEndpoint from './endpoints/registrerteBarnEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import { Søker } from '../types/Søker';
import { RegistrertBarn } from '../types/RegistrertBarn';

export enum RequestStatus {
    'loading' = 'loading',
    'success' = 'success',
    'error' = 'error',
}

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

const getSøknadInitialData = (
    søker: Søker,
    registrerteBarn: RegistrertBarn[],
    mellomlagring: SøknadMellomlagring
): SøknadInitialData => {
    const validMellomlagring = isMellomlagringValid(mellomlagring, { søker, registrerteBarn }) ? mellomlagring : {};
    return {
        versjon: MELLOMLAGRING_VERSION,
        søker,
        registrerteBarn,
        søknadsdata: {},
        ...validMellomlagring,
    };
};

function useSøknadInitialData(): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, registrerteBarn, mellomlagring] = await Promise.all([
                søkerEndpoint.fetch(),
                registrerteBarnEndpoint.fetch(),
                mellomlagringEndpoint.fetch(),
            ]);
            setInitialData({
                status: RequestStatus.success,
                data: getSøknadInitialData(søker, registrerteBarn, mellomlagring),
            });
            return Promise.resolve();
        } catch (error: any) {
            if (isUnauthorized(error)) {
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
