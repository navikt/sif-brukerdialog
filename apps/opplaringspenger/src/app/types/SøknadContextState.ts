import { StepID } from '../søknad/søknadStepsConfig';
import { RegistrertBarn } from './RegistrertBarn';
import { Søker } from './Søker';
import { SøknadFormValues } from './SøknadFormValues';

export interface SøknadContextState {
    søker: Søker;
    søknadId?: string;
    barn: RegistrertBarn[];
    step?: StepID;
    søknadFormValues?: SøknadFormValues;
}
