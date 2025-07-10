import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';
import { Mellomlagring, MellomlagringMetaData, stateMellomlagring } from '../utils/stateMellomlagring';

export const useStateMellomlagring = () => {
    const {
        state: { søker, registrerteBarn },
    } = useSøknadContext();

    const metaData: MellomlagringMetaData = {
        MELLOMLAGRING_VERSJON,
        søker,
        registrerteBarn,
    };

    return {
        hentMellomlagring: () => stateMellomlagring.hent(metaData),
        slettMellomlagring: stateMellomlagring.slett,
        lagreMellomlagring: (data: Mellomlagring) => stateMellomlagring.lagre(data, metaData),
    };
};
