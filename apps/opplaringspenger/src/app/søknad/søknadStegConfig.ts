import { SoknadApplicationType, SoknadStepsConfig } from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepTypes';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import { SøknadRoutes } from '../types/SøknadRoutes';
import { Søknadsdata } from '../types/Søknadsdata';

export enum StegID {
    'VELKOMMEN' = 'velkommen',
    'BARN' = 'barn',
    'ARBEID' = 'arbeid',
    'OPPLÆRING' = 'opplaring',
    'OPPSUMMERING' = 'oppsummering',
    'SØKNAD_SENDT' = 'soknad_sendt',
}

const getSøknadSteg = (søknadsdata: Søknadsdata): StegID[] => {
    return [StegID.BARN, StegID.ARBEID, StegID.OPPLÆRING, StegID.OPPSUMMERING];
};

export const getSøknadStegConfig = (søknadsdata: Søknadsdata): SoknadStepsConfig<StegID, SøknadRoutes> =>
    soknadStepUtils.getStepsConfig(getSøknadSteg(søknadsdata), SoknadApplicationType.SOKNAD);
