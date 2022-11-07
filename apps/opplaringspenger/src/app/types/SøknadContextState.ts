import { Institusjon } from './Institusjon';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    institusjoner: Institusjon[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
