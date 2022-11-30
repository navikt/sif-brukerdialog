import { Arbeidsgiver } from './Arbeidsgiver';
import { Sak } from './Sak';
import { Søker } from './Søker';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    saker: Sak[];
    arbeidsgivere: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
