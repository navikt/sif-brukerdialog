import { useSøknadContext } from '@hooks';
import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { EndringType } from '@types';
import { SKJEMANAVN } from '../App';
import { getSøknadSteps } from '../søknad/config/søknadStepConfig';
import actionsCreator from '../søknad/context/action/actionCreator';

export const useStartSøknad = () => {
    const { logSoknadStartet, logInfo } = useAmplitudeInstance();
    const {
        state: { sak, søknadsdata },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        const steps = getSøknadSteps(hvaSkalEndres, sak.harUkjentArbeidsforhold, søknadsdata);
        logSoknadStartet(SKJEMANAVN);
        logInfo({
            antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidsaktiviteter.arbeidstakerAktiviteter.length > 0,
            erFrilanser: sak.arbeidsaktiviteter.frilanser !== undefined,
        });
        dispatch(actionsCreator.startSøknad(sak, hvaSkalEndres, steps[0]));
    };

    return {
        startSøknad,
    };
};
