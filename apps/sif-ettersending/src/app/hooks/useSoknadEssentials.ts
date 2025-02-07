import { useState } from 'react';
import { fetchBarn, fetchSøker, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { isForbidden, isUnauthorized } from '@navikt/sif-common-core-ds/src/utils/apiUtils';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { isObjectLike } from 'lodash';
import getSoknadTempStorage from '../api/getSoknadTempStorage';
import { RequestStatus } from '../types/RequestStatus';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { Søknadstype } from '../types/Søknadstype';
import appSentryLogger from '../utils/appSentryLogger';
import { navigateToLoginPage } from '../utils/navigationUtils';

export type SoknadEssentials = { søker: Søker; barn?: RegistrertBarn[]; mellomlagring?: SoknadTempStorageData };

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

const isUnknownAxiosError = (error: any) => {
    try {
        return (
            error !== undefined &&
            isObjectLike(error) &&
            error.code === 'ERR_NETWORK' &&
            error.status === 'None' &&
            error.number[0] === undefined
        );
    } catch {
        return false;
    }
};

function useSoknadEssentials(søknadstype: Søknadstype): SøknadInitialDataState {
    const [initialData, setInitialData] = useState<SøknadInitialDataState>({ status: RequestStatus.loading });

    const fetch = async () => {
        try {
            if (søknadstype === Søknadstype.pleiepengerSyktBarn) {
                const [søker, barn, mellomlagring] = await Promise.all([
                    fetchSøker(),
                    fetchBarn(),
                    getSoknadTempStorage(søknadstype),
                ]);
                setInitialData({
                    status: RequestStatus.success,
                    data: { søker, barn, mellomlagring },
                });
            } else {
                const [søker, mellomlagring] = await Promise.all([fetchSøker(), getSoknadTempStorage(søknadstype)]);
                setInitialData({
                    status: RequestStatus.success,
                    data: { søker, mellomlagring },
                });
            }

            return Promise.resolve();
        } catch (error) {
            if (isUnauthorized(error)) {
                navigateToLoginPage(søknadstype);
                return;
            } else if (isForbidden(error)) {
                setInitialData({
                    status: RequestStatus.ikkeTilgang,
                });
            } else {
                if (!isUnknownAxiosError(error)) {
                    appSentryLogger.logError('fetchInitialData', JSON.stringify({ error }));
                }
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
