import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { Mellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { mellomlagringUtils } from '../utils/mellomlagringUtils';

export const useMellomlagring = () => {
    const {
        state: { søker, registrerteBarn },
    } = useSøknadContext();

    const metaData: MellomlagringMetaData = {
        MELLOMLAGRING_VERSJON,
        søker,
        registrerteBarn,
    };

    return {
        hentMellomlagring: () => mellomlagringUtils.hent(metaData),
        slettMellomlagring: mellomlagringUtils.slett,
        lagreMellomlagring: (data: Mellomlagring) => mellomlagringUtils.lagre(data, metaData),
    };
};
