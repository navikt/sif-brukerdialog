import { RegistrertBarn, Søker } from '@navikt/sif-common-api';

import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';
import { StepId } from './StepId';

export type SituasjonStepTempFormValues = {
    stepId: StepId.SITUASJON;
    values: SituasjonFormValues;
};

export type DineBarnStepTempFormValues = {
    stepId: StepId.DINE_BARN;
    values: Partial<DineBarnFormValues>;
};

export type TempFormValues = SituasjonStepTempFormValues | DineBarnStepTempFormValues | undefined;

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
    tempFormValues?: TempFormValues;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
    isReloadingApp?: boolean;
}
