import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';
import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad/lib/soknad-step/soknadStepUtils';
import { Mottaker, SoknadFormData } from '../types/SoknadFormData';

export enum StepID {
    'MOTTAKER' = 'mottaker',
    'DINE_BARN' = 'dine-barn',
    'OM_BARNA' = 'om-barna',
    'DIN_SITUASJON' = 'din-situasjon',
    'SAMVÆRSAVTALE' = 'samværsavtale',
    'OPPSUMMERING' = 'oppsummering',
}

const getSoknadSteps = (values: SoknadFormData): StepID[] => {
    const inkluderSamværsforelder =
        values.gjelderMidlertidigPgaKorona === YesOrNo.NO && values.mottakerType === Mottaker.samværsforelder;
    return [
        StepID.MOTTAKER,
        StepID.DINE_BARN,
        StepID.OM_BARNA,
        StepID.DIN_SITUASJON,
        ...(inkluderSamværsforelder ? [StepID.SAMVÆRSAVTALE] : []),
        StepID.OPPSUMMERING,
    ];
};

export const getSoknadStepsConfig = (values: SoknadFormData): SoknadStepsConfig<StepID> =>
    soknadStepUtils.getStepsConfig(getSoknadSteps(values), SoknadApplicationType.MELDING);
