import { DateRange } from '@navikt/sif-common-utils';
import { StepId } from '../søknad/config/StepId';
import { SøknadRoutes } from '../søknad/config/SøknadRoutes';
import { ArbeidstidFormValues } from '../søknad/steps/arbeidstid/ArbeidstidForm';
import { LovbestemtFerieFormValues } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { UkjentArbeidsforholdFormValues } from '../søknad/steps/ukjent-arbeidsforhold/UkjentArbeidsforholdForm';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9Sak } from './K9Sak';
import { Sak } from './Sak';
import { Søker } from './Søker';
import { Søknadsdata } from './Søknadsdata';
import { TimerEllerProsent } from './TimerEllerProsent';
import { ValgteEndringer } from './ValgteEndringer';

interface TempArbeidstidFormValues {
    stepId: StepId.ARBEIDSTID;
    values: Partial<ArbeidstidFormValues>;
}
interface TempUkjentArbeidsforholdFormValues {
    stepId: StepId.UKJENT_ARBEIDSFOHOLD;
    values: Partial<UkjentArbeidsforholdFormValues>;
}
interface TempFerieFormValues {
    stepId: StepId.LOVBESTEMT_FERIE;
    values: Partial<LovbestemtFerieFormValues>;
}

export type TempFormValues = TempUkjentArbeidsforholdFormValues | TempArbeidstidFormValues | TempFerieFormValues;

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
    tempFormValues?: TempFormValues;
}

export interface SøknadContextInputPreferanse {
    timerEllerProsent: TimerEllerProsent;
}
