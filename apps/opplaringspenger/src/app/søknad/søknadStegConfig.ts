import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { SøknadRoutes } from './SøknadRoutes';

export enum StegID {
    'VELKOMMEN' = 'velkommen',
    'BARN' = 'barn',
    'ARBEID' = 'arbeid',
    'OPPLÆRING' = 'opplaring',
    'OPPSUMMERING' = 'oppsummering',
    'SØKNAD_SENDT' = 'soknad_sendt',
}

const getSøknadSteg = (): StegID[] => {
    return [StegID.BARN, StegID.ARBEID, StegID.OPPLÆRING, StegID.OPPSUMMERING];
};

export const getSøknadStegConfig = (): SoknadStepsConfig<StegID, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadSteg(), SoknadApplicationType.SOKNAD);
