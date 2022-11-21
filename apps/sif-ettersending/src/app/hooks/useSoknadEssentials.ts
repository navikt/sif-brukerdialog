import { useEffect, useState } from 'react';
import { combine, initial, pending, RemoteData } from '@devexperts/remote-data-ts';
import { isUserLoggedOut } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { AxiosError } from 'axios';
import getSokerRemoteData from '../api/getSoker';
import getSoknadTempStorage from '../api/getSoknadTempStorage';
import { Person } from '../types/Person';
import { SoknadTempStorageData } from '../types/SoknadTempStorageData';
import { navigateToLoginPage } from '../utils/navigationUtils';
import { ApplicationType } from '../types/ApplicationType';

export type SoknadEssentials = [Person, SoknadTempStorageData];

export type SoknadEssentialsRemoteData = RemoteData<AxiosError, SoknadEssentials>;

function useSoknadEssentials(søknadstype?: ApplicationType): SoknadEssentialsRemoteData {
    const [data, setData] = useState<SoknadEssentialsRemoteData>(initial);
    const fetch = async () => {
        try {
            const [sokerResult, soknadTempStorageResult] = await Promise.all([
                getSokerRemoteData(),
                getSoknadTempStorage(),
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
    useEffect(() => {
        fetch();
        //TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return data;
}

export default useSoknadEssentials;
