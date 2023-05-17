import { DateRange } from '@navikt/sif-common-utils';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from './Arbeidsgiver';
import { EndringType } from './_EndringType';
import { K9Sak } from './_K9Sak';
import { Sak } from './_Sak';
import { Søker } from './_Søker';
import { Søknadsdata } from './_Søknadsdata';
import { TimerEllerProsent } from './_TimerEllerProsent';

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
