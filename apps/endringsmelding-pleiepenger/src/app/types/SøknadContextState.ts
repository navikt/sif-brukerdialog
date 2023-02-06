import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9Sak } from './K9Sak';
import { Sak } from './Sak';
import { Søker } from './Søker';
import { Søknadsdata } from './søknadsdata/Søknadsdata';
import { TimerEllerProsent } from './TimerEllerProsent';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    k9saker: K9Sak[];
    saker: Sak[];
    sak: Sak;
    arbeidsgivere: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    endringsmeldingSendt?: boolean;
    børMellomlagres?: boolean;
    inputPreferanser: SøknadContextInputPreferanse;
}

export interface SøknadContextInputPreferanse {
    timerEllerProsent: TimerEllerProsent;
}
