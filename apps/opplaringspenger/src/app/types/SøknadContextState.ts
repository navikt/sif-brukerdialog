import { SøknadStegID } from '../søknad/søknadStepsConfig';
import { RegistrertBarn } from './RegistrertBarn';
import { Søker } from './Søker';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadContextState {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    steg?: SøknadStegID;
    søknad?: Søknadsdata;
    søknadSendt?: boolean;
}
