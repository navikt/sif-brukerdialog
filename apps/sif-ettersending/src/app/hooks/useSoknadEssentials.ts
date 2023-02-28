import { useState } from 'react';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import getSokerRemoteData from '../api/getSoker';
import getSoknadTempStorage from '../api/getSoknadTempStorage';
import { ApplicationType } from '../types/ApplicationType';
import { Person } from '../types/Person';
import { RequestStatus } from '../types/RequestStatus';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import appSentryLogger from '../utils/appSentryLogger';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { navigateToLoginPage } from '../utils/navigationUtils';

export type SoknadEssentials = { søker: Person; mellomlagring?: SoknadTempStorageData };

type SøknadInitialSuccess = {
    status: RequestStatus.success;
    data: SoknadEssentials;
};

type SøknadInitialIkkeTilgang = {
    status: RequestStatus.ikkeTilgang;
};

type SøknadInitialFailed = {
    status: RequestStatus.error;
    error: any;
};

type SøknadInitialLoading = {
    status: RequestStatus.loading;
};

export type SøknadInitialDataState =
    | SøknadInitialSuccess
    | SøknadInitialFailed
    | SøknadInitialLoading
    | SøknadInitialIkkeTilgang;

function useSoknadEssentials(søknadstype: ApplicationType): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            const [søker, mellomlagring] = await Promise.all([getSokerRemoteData(), getSoknadTempStorage(søknadstype)]);
            setInitialData({
                status: RequestStatus.success,
                data: { søker, mellomlagring },
            });
            return Promise.resolve();
        } catch (error) {
            if (isUnauthorized(error)) {
                navigateToLoginPage(søknadstype);
                return Promise.reject(error);
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.ikkeTilgang,
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

export default useSoknadEssentials;
