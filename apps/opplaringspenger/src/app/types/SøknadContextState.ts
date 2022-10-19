import { SøknadRoutes } from './SøknadRoutes';
import { RegistrertBarn } from './RegistrertBarn';
import { Søker } from './Søker';
import { Søknadsdata } from './Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
