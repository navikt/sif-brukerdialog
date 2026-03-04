import { useMemo } from 'react';

import { useYtelseMellomlagring } from '@navikt/sif-common-query';

import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { AppMellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);

    const metadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!søknadState) return undefined;
        return {
            MELLOMLAGRING_VERSJON,
            søker: søknadState.søker,
            barn: søknadState.barn,
        };
    }, [søknadState]);

    return useYtelseMellomlagring<AppMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);
};
