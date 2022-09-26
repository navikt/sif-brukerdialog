import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { Søker } from '../types/Søker';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToNoAccessPage } from '../utils/navigationUtils';
import registrerteBarnEndpoint from './endpoints/registrerteBarnEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';
import { SøknadMellomlagring } from '../types/SøknadMellomlagring';
import mellomlagringEndpoint from './endpoints/mellomlagringEndpoint';

export enum RequestStatus {
    'loading' = 'loading',
    'success' = 'success',
    'error' = 'error',
}

export interface SøknadInitialData {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    mellomlagring: SøknadMellomlagring;
}

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
                data: {
                    søker,
                    registrerteBarn,
                    mellomlagring,
                },
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
