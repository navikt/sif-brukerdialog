import { DateRange, Duration, ISODate, ISODateRangeMap } from '@navikt/sif-common-utils';
import { FeriedagMap } from '../søknad/steps/lovbestemt-ferie/LovbestemtFerieStep';
import { Arbeidsgiver } from './Arbeidsgiver';
import { K9SakBarn } from './K9Sak';

export enum ArbeidAktivitetType {
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

interface ArbeidAktivitetBase {
    key: string;
    type: ArbeidAktivitetType;
    navn: string;
    perioderMedArbeidstid: PeriodeMedArbeidstid[];
    harPerioderFørTillattEndringsperiode: boolean;
    harPerioderEtterTillattEndringsperiode: boolean;
}

export interface ArbeidAktivitetArbeidstaker extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.arbeidstaker;
    arbeidsgiver: Arbeidsgiver;
    erUkjentArbeidsforhold: boolean;
}
export interface ArbeidAktivitetFrilanser extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.frilanser;
}

export interface ArbeidAktivitetSelvstendigNæringsdrivende extends ArbeidAktivitetBase {
    type: ArbeidAktivitetType.selvstendigNæringsdrivende;
}

export type ArbeidAktivitet =
    | ArbeidAktivitetArbeidstaker
    | ArbeidAktivitetFrilanser
    | ArbeidAktivitetSelvstendigNæringsdrivende;

export interface ArbeidAktiviteter {
    arbeidstakerAktiviteter: ArbeidAktivitetArbeidstaker[];
    frilanser?: ArbeidAktivitetFrilanser;
    selvstendigNæringsdrivende?: ArbeidAktivitetSelvstendigNæringsdrivende;
}

export interface SakLovbestemtFerie {
    feriedager: FeriedagMap;
}

export interface Sak {
    /** Barn i sak */
    barn: K9SakBarn;
    /** Settes til true dersom det finnes en arbeidsgiver som ikke har arbeidstid i sak */
    harUkjentArbeidsforhold: boolean;
    /** Alle arbeidsgivere som ikke finnes i sak, men som finnes i Aa-reg */
    ukjenteArbeidsgivere: Arbeidsgiver[];
    /** Alle arbeidAktiviteter i sak. Arbeidsgivere flates ut og legges sammen med evt. frilans og selvstendig */
    arbeidAktiviteter: ArbeidAktiviteter;
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
        aktiviteterSomKanEndres: ArbeidAktivitet[];
    };
}
