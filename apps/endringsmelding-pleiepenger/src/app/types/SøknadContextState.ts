import { DateRange } from '@navikt/sif-common-utils';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from './Arbeidsgiver';
import { EndringType } from './EndringType';
import { K9Sak } from './K9Sak';
import { Sak } from './Sak';
import { Søker } from './Søker';
import { Søknadsdata } from './Søknadsdata';
import { TimerEllerProsent } from './TimerEllerProsent';

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    k9saker: K9Sak[];
    sak: Sak;
    tillattEndringsperiode: DateRange;
    arbeidsgivere: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    søknadRoute?: SøknadRoutes;
    endringsmeldingSendt?: boolean;
    børMellomlagres?: boolean;
    valgtHvaSkalEndres: EndringType[];
    inputPreferanser: SøknadContextInputPreferanse;
}

export interface SøknadContextInputPreferanse {
    timerEllerProsent: TimerEllerProsent;
}
