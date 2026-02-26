import { MELLOMLAGRING_VERSJON } from '../../../constants/MELLOMLAGRING_VERSJON';
import { Mellomlagring, MellomlagringMetaData } from '../../../types/Mellomlagring';
import { mellomlagringUtils } from '../../../utils/mellomlagringUtils';
import { useSøknadContext } from '../context/useSøknadContext';

export const useMellomlagring = () => {
    const { søker, registrerteBarn } = useSøknadContext();

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
