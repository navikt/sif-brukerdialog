import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { Mellomlagring, MellomlagringMetaData, søknadMellomlagring } from '../utils/søknadMellomlagring';

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
        hentMellomlagring: () => søknadMellomlagring.hent(metaData),
        slettMellomlagring: søknadMellomlagring.slett,
        lagreMellomlagring: (data: Mellomlagring) => søknadMellomlagring.lagre(data, metaData),
    };
};
