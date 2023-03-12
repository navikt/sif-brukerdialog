import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from './Arbeidsgiver';
import { Søker } from './Søker';
import { Sak } from './Sak';
import { Søknadsdata } from './søknadsdata/Søknadsdata';
import { TimerEllerProsent } from './TimerEllerProsent';
import { K9Sak } from './K9Sak';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { EndringType } from './EndringType';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    k9saker: K9Sak[];
    sak: Sak;
    endringsperiode: DateRange;
    arbeidsgivere: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    endringsmeldingSendt?: boolean;
    børMellomlagres?: boolean;
    hvaSkalEndres: EndringType[];
    inputPreferanser: SøknadContextInputPreferanse;
}

export interface SøknadContextInputPreferanse {
    timerEllerProsent: TimerEllerProsent;
}
