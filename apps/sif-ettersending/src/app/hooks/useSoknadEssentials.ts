import { useState } from 'react';
import { combine, initial, pending, RemoteData } from '@devexperts/remote-data-ts';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';
import { isUserLoggedOut } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { AxiosError } from 'axios';
import getSokerRemoteData from '../api/getSoker';
import getSoknadTempStorage from '../api/getSoknadTempStorage';
import { ApplicationType } from '../types/ApplicationType';
import { Person } from '../types/Person';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { navigateToLoginPage } from '../utils/navigationUtils';

export type SoknadEssentials = [Person, SoknadTempStorageData];

export type SoknadEssentialsRemoteData = RemoteData<AxiosError, SoknadEssentials>;

function useSoknadEssentials(søknadstype: ApplicationType): SoknadEssentialsRemoteData {
    const [data, setData] = useState<SoknadEssentialsRemoteData>(initial);
    const fetch = async () => {
        try {
            const [sokerResult, soknadTempStorageResult] = await Promise.all([
                getSokerRemoteData(),
                getSoknadTempStorage(søknadstype),
            ]);
            setData(combine(sokerResult, soknadTempStorageResult));
        } catch (remoteDataError) {
            if (isUserLoggedOut(remoteDataError.error) && søknadstype) {
                setData(pending);
                navigateToLoginPage(søknadstype);
            } else {
                setData(remoteDataError);
            }
        }
    };
    useEffectOnce(() => {
        fetch();
    });
    return data;
}

export default useSoknadEssentials;
