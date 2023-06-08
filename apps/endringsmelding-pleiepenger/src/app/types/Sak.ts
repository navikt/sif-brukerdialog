import { DateRange, Duration, ISODate, ISODateRangeMap } from '@navikt/sif-common-utils';
import { FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9SakBarn } from './K9Sak';

export interface Sak {
    /** Barn i sak */
    barn: K9SakBarn;
    /** Settes til true hvis det finnes en arbeidsgiver som ikke har arbeidstid i sak */
    harUkjentArbeidsforhold: boolean;
    /** Alle arbeidsgivere som ikke finnes i sak, men som finnes i Aa-reg */
    ukjenteArbeidsgivere: Arbeidsgiver[];
    /** Alle arbeidsaktiviteter i sak. Arbeidsgivere flates ut og legges sammen med evt. frilans og selvstendig */
    arbeidsaktiviteter: Arbeidsaktiviteter;
    /** Ferie i søknadsperiodene */
    lovbestemtFerie: SakLovbestemtFerie;
    /** Søknadsperioder som er innenfor tillatt endringsperiode. Periodene som overlapper kuttes. */
    søknadsperioder: DateRange[];
    /** DateRange med alle søknadsperioder som er innenfor tillatt endringsperiode */
    samletSøknadsperiode: DateRange;
    /** Ytelse = PSB */
    ytelse: {
        type: string;
    };
    utledet: {
        /** Alle aktiviteter i sak som kan endres; arbeidsgivere, frilans og selvstendig */
        aktiviteterSomKanEndres: Arbeidsaktivitet[];
    };
}

export enum ArbeidsaktivitetType {
    arbeidstaker = 'arbeidstaker',
    frilanser = 'frilanser',
    selvstendigNæringsdrivende = 'selvstendigNæringsdrivende',
}

export type FaktiskOgNormalArbeidstid = {
    faktisk: Duration;
    normalt: Duration;
};

export type ArbeidstidPerDag = {
    faktisk?: Duration;
    normalt: Duration;
};

export type ArbeidstidEnkeltdagMap = {
    [key: ISODate]: ArbeidstidPerDag;
};

export interface ArbeidsukeTimer {
    dag: Duration;
    uke: Duration;
}

export interface Arbeidsuke {
    isoDateRange: string;
    periode: DateRange;
    arbeidstidEnkeltdager: ArbeidstidEnkeltdagMap;
    faktisk?: ArbeidsukeTimer;
    normalt: ArbeidsukeTimer;
    antallDagerMedArbeidstid: number;
}

export type ArbeidsukeMap = ISODateRangeMap<Arbeidsuke>;

export interface PeriodeMedArbeidstid extends DateRange {
    arbeidsuker: ArbeidsukeMap;
}

interface ArbeidsaktivitetBase {
    key: string;
    type: ArbeidsaktivitetType;
    navn: string;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
    harPerioderFørTillattEndringsperiode: boolean;
    harPerioderEtterTillattEndringsperiode: boolean;
}

export interface ArbeidsaktivitetArbeidstaker extends ArbeidsaktivitetBase {
    type: ArbeidsaktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
    erUkjentArbeidsforhold: boolean;
}
export interface ArbeidsaktivitetFrilanser extends ArbeidsaktivitetBase {
    type: ArbeidsaktivitetType.frilanser;
}

export interface ArbeidsaktivitetSelvstendigNæringsdrivende extends ArbeidsaktivitetBase {
    type: ArbeidsaktivitetType.selvstendigNæringsdrivende;
}

export type Arbeidsaktivitet =
    | ArbeidsaktivitetArbeidstaker
    | ArbeidsaktivitetFrilanser
    | ArbeidsaktivitetSelvstendigNæringsdrivende;

export interface Arbeidsaktiviteter {
    arbeidstakerAktiviteter: ArbeidsaktivitetArbeidstaker[];
    frilanser?: ArbeidsaktivitetFrilanser;
    selvstendigNæringsdrivende?: ArbeidsaktivitetSelvstendigNæringsdrivende;
}

export interface SakLovbestemtFerie {
    feriedager: FeriedagMap;
}
