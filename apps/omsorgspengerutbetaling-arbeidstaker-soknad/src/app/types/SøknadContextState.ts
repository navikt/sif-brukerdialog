import { DineBarnFormValues } from '../søknad/steps/dine-barn/DineBarnStep';
import { SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { RegistrertBarn } from './RegistrertBarn';
import { StepId } from './StepId';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { ArbeidsgiverDetaljer } from './søknadApiData/SøknadApiData';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

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
    kvitteringInfo?: ArbeidsgiverDetaljer[];
    tempFormValues?: TempFormValues;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
