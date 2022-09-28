import { RegistrertBarn } from './RegistrertBarn';
import { Søker } from './Søker';
import { SøknadFormValues } from './SøknadFormValues';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadContextState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadID?: string;
    søknadsdata?: Søknadsdata;
    søknadSendt?: boolean;
    søknadFormValues?: SøknadFormValues;
}
