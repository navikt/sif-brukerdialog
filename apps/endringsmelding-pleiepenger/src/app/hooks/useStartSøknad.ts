import { useAmplitudeInstance } from '@navikt/sif-common-amplitude/lib';
import { EndringType } from '@types';
import { SKJEMANAVN } from '../App';
import { getSøknadSteps } from '../søknad/config/søknadStepConfig';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from '../søknad/context/hooks/useSøknadContext';

export const useStartSøknad = () => {
    const { logSoknadStartet, logInfo } = useAmplitudeInstance();
    const {
        state: { sak, søknadsdata },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        const steps = getSøknadSteps(hvaSkalEndres, søknadsdata, sak.harUkjentArbeidsforhold);
        logSoknadStartet(SKJEMANAVN);
        logInfo({
            antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidAktiviteter.arbeidstakerAktiviteter.length > 0,
            erFrilanser: sak.arbeidAktiviteter.frilanser !== undefined,
        });
        dispatch(actionsCreator.startSøknad(sak, hvaSkalEndres, steps[0]));
    };

    return {
        startSøknad,
    };
};
