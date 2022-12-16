import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9Sak } from './K9Sak';
import { Søker } from './Søker';
import { Sak } from './Sak';
import { Søknadsdata } from './søknadsdata/Søknadsdata';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    k9saker: K9Sak[];
    sak: Sak;
    arbeidsgivere: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    endringsmeldingSendt?: boolean;
    børMellomlagres?: boolean;
}
