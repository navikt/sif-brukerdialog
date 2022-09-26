import { useEffect, useState } from 'react';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { Søker } from '../types/Søker';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToNoAccessPage } from '../utils/navigationUtils';
import registrerteBarnEndpoint from './endpoints/registrerteBarnEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';

export enum RequestStatus {
    'loading' = 'loading',
    'success' = 'success',
    'error' = 'error',
}

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    data: {
        søker: Søker;
        registrerteBarn: RegistrertBarn[];
    };
};
type SøknadInitialFailed = {
    status: RequestStatus.error;
    error: any;
};
type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

export type SøknadInitialData = SøknadInitialSuccess | SøknadInitialFailed | SøknadInitialLoading;

function useSøknadInitialData(): SøknadInitialData {
    const [initialData, setInitialData] = useState<SøknadInitialData>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, registrerteBarn] = await Promise.all([
                søkerEndpoint.fetch(),
                registrerteBarnEndpoint.fetch(),
            ]);
            setInitialData({
                status: RequestStatus.success,
                data: {
                    søker,
                    registrerteBarn,
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
