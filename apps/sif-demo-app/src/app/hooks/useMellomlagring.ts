import { useMemo } from 'react';

import { useYtelseMellomlagring } from '@navikt/sif-common-query';

import { useSøknadFlyt } from '../../rammeverk';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { Mellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);

    if (!søknadState) {
        throw new Error('useMellomlagring må brukes etter at søknadState er initialisert');
    }

    const { søker, barn, søknadsdata } = søknadState;

    const metadata = useMemo<MellomlagringMetaData>(
        () => ({
            MELLOMLAGRING_VERSJON,
            søker,
            barn,
        }),
        [søker, barn],
    );

    const mellomlagring = useYtelseMellomlagring<Mellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

    const getData = (): Mellomlagring => ({
        søknadsdata,
        currentStegId,
    });

    return {
        getData,
        lagre: mellomlagring.lagre,
        slett: mellomlagring.slett,
        isLagring: mellomlagring.isLagring,
    };
};
