import { ArbeidstidFormValues } from '../søknad/steps/arbeidstid/ArbeidstidStep';
import { Arbeidsgiver } from './Arbeidsgiver';
import { Opplæringsinstitusjon } from './Opplæringsinstitusjon';
import { KvitteringInfo } from './KvitteringInfo';
import { RegistrertBarn } from './RegistrertBarn';
import { StepId } from './StepId';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export type ArbeidstidStepTempFormValues = {
    stepId: StepId.ARBEIDSTID;
    values: Partial<ArbeidstidFormValues>;
};

export type TempFormValues = ArbeidstidStepTempFormValues | undefined;

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    opplæringsinstitusjoner: Opplæringsinstitusjon[];
    frilansoppdrag?: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    tempFormData?: TempFormValues;
    kvitteringInfo?: KvitteringInfo;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
