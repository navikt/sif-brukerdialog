import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { Sak } from '../../types/Sak';
import { getAktiviteterSomKanEndres } from '../../utils/arbeidAktivitetUtils';
import { StepId } from './StepId';

export const getSøknadSteps = (sak: Sak): StepId[] => {
    const aktiviteter = getAktiviteterSomKanEndres(sak.arbeidAktiviteter);
    if (aktiviteter.length === 1) {
        return [StepId.ARBEIDSTID, StepId.OPPSUMMERING];
    }
    return [StepId.AKTIVITET, StepId.ARBEIDSTID, StepId.OPPSUMMERING];
};

export const getSøknadStepConfig = (sak: Sak): SoknadStepsConfig<StepId> =>
    soknadStepUtils.getStepsConfig(getSøknadSteps(sak), SoknadApplicationType.MELDING);
