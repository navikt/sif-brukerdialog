import { SituasjonFormValues } from '../søknad/steps/situasjon/SituasjonStep';
import { StepId } from './StepId';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { ArbeidsgiverDetaljer } from './søknadApiData/SøknadApiData';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export type SituasjonStepTempFormValues = {
    stepId: StepId.SITUASJON;
    values: SituasjonFormValues;
};

export type TempFormValues = SituasjonStepTempFormValues | undefined;

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    søknadsdata: Søknadsdata;
    kvitteringInfo?: ArbeidsgiverDetaljer[];
    tempFormValues?: TempFormValues;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
