import { useSøknadContext } from '@hooks';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { EndringType } from '@types';
import { SKJEMANAVN } from '../App';
import actionsCreator from '../søknad/context/action/actionCreator';

export const useStartSøknad = () => {
    const { logSoknadStartet, logInfo } = useAmplitudeInstance();
    const {
        state: { sak, antallSakerFørEndringsperiode },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        logSoknadStartet(SKJEMANAVN);
        logInfo({
            antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidsaktiviteter.arbeidstakerAktiviteter.length > 0,
            erFrilanser: sak.arbeidsaktiviteter.frilanser !== undefined,
            arbeidsgivereIkkeISak: sak.arbeidsgivereIkkeISak.length,
            arbeidsgivereIkkeIAAreg: sak.arbeidsaktivitetMedUkjentArbeidsgiver.length,
            antallSakerFørEndringsperiode,
        });
        dispatch(actionsCreator.startSøknad(sak, hvaSkalEndres));
    };

    return {
        startSøknad,
    };
};
