import { RegistrertBarn } from './RegistrertBarn';
import { Søker } from './Søker';
import { SøknadFormValues } from './SøknadFormValues';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadContextState {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadID?: string;
    søknad?: Søknadsdata;
    søknadSendt?: boolean;
    søknadFormValues?: SøknadFormValues;
}
