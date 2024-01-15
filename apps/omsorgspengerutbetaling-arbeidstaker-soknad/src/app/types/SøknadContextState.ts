import { FosterbarnFormValues } from '../søknad/steps/fosterbarn/FosterbarnStep';
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

export type BarnStepTempFormValues = {
    stepId: StepId.FOSTERBARN;
    values: Partial<FosterbarnFormValues>;
};

export type TempFormValues = SituasjonStepTempFormValues | BarnStepTempFormValues | undefined;

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
