import { Arbeidsgiver } from './Arbeidsgiver';
import { Søker } from './Søker';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    frilansoppdrag?: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
