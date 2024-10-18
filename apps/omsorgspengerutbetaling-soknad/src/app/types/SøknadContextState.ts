import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { StepId } from './StepId';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export type BarnStepTempFormValues = {
    stepId: StepId.DINE_BARN;
    values: Partial<DineBarnFormValues>;
};

export type TempFormValues = BarnStepTempFormValues | undefined;

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
    tempFormData?: TempFormValues;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    /** Settes til true dersom appen/siden lastes på nytt */
    isReloadingApp?: boolean;
    børMellomlagres?: boolean;
}
