import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';

export enum SøknadStegID {
    'BARN' = 'barn',
    'ARBEID' = 'arbeid',
    'OPPSUMMERING' = 'oppsummering',
}

const getSøknadSteg = (): SøknadStegID[] => {
    return [SøknadStegID.BARN, SøknadStegID.ARBEID, SøknadStegID.OPPSUMMERING];
};

export const getSøknadStegConfig = (): SoknadStepsConfig<SøknadStegID> =>
    soknadStepUtils.getStepsConfig(getSøknadSteg(), SoknadApplicationType.MELDING);
