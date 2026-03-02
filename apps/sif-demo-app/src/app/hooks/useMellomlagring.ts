import { useSøknadFlyt } from '../../rammeverk';

import { MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { Mellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { mellomlagringUtils } from '../utils/mellomlagringUtils';
import { useSøknadStore } from './useSøknadStore';

export const useMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);

    if (!søknadState) {
        throw new Error('useMellomlagring må brukes etter at søknadState er initialisert');
    }

    const { søker, barn, søknadsdata } = søknadState;

    const metaData: MellomlagringMetaData = {
        MELLOMLAGRING_VERSJON,
        søker,
        barn,
    };

    const getData = (): Mellomlagring => ({
        søknadsdata,
        currentStegId,
    });

    return {
        getData,
        hentMellomlagring: () => mellomlagringUtils.hent(metaData),
        slettMellomlagring: mellomlagringUtils.slett,
        lagreMellomlagring: (data: Mellomlagring) => mellomlagringUtils.lagre(data, metaData),
    };
};
