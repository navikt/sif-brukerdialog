import { Søker } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-utils';
import { StepId } from '../søknad/config/StepId';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9Sak } from './K9Sak';
import { Sak } from './Sak';
import { Søknadsdata } from './Søknadsdata';
import { TimerEllerProsent } from './TimerEllerProsent';
import { ValgteEndringer } from './ValgteEndringer';

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
    valgteEndringer: ValgteEndringer;
    søknadSteps: StepId[];
    inputPreferanser: SøknadContextInputPreferanse;
    /** Antall saker hvor siste søknadsperiode slutter før gyldig endringsperiode */
    antallSakerFørEndringsperiode: number;
}

export interface SøknadContextInputPreferanse {
    timerEllerProsent: TimerEllerProsent;
}
