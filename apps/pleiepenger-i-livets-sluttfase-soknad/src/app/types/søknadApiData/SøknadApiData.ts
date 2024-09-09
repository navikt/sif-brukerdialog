import {
    MedlemskapApiData,
    OpptjeningAktivitet,
    UtenlandskNæringstype,
    VirksomhetApiData,
} from '@navikt/sif-common-forms-ds';
import { ISODate, ISODuration } from '@navikt/sif-common-utils';
import { JobberIPeriodeSvar } from '../../søknad/steps/arbeidstid/ArbeidstidTypes';
import { ArbeidsgiverType } from '../Arbeidsgiver';
import { ÅrsakManglerIdentitetsnummer } from '../ÅrsakManglerIdentitetsnummer';

export interface PleietrengendeApi {
    navn: string;
    norskIdentitetsnummer?: string;
    årsakManglerIdentitetsnummer?: ÅrsakManglerIdentitetsnummer;
    fødselsdato?: string;
}

export interface TidEnkeltdagApiData {
    dato: ISODate;
    tid: ISODuration;
}

export interface TidFasteDagerApiData {
    mandag?: ISODuration;
    tirsdag?: ISODuration;
    onsdag?: ISODuration;
    torsdag?: ISODuration;
    fredag?: ISODuration;
}

export interface ArbeidIPeriodeApiData {
    jobberIPerioden: JobberIPeriodeSvar;
    enkeltdager: TidEnkeltdagApiData[];
}

export interface ArbeidsforholdApiData {
    jobberNormaltTimer: number;
    arbeidIPeriode?: ArbeidIPeriodeApiData;
}

export interface ArbeidsgiverApiData {
    type: ArbeidsgiverType;
    navn: string;
    organisasjonsnummer?: string;
    offentligIdent?: string;
    ansattFom?: ISODate;
    ansattTom?: ISODate;
    erAnsatt: boolean;
    sluttetFørSøknadsperiode?: boolean;
    arbeidsforhold?: ArbeidsforholdApiData;
}

export interface FrilansApiData {
    harHattInntektSomFrilanser: boolean;
    startdato: ISODate;
    jobberFortsattSomFrilans: boolean;
    sluttdato?: ISODate;
    arbeidsforhold?: ArbeidsforholdApiData;
}

export interface SelvstendigNæringsdrivendeApiData {
    virksomhet: VirksomhetApiData;
    arbeidsforhold: ArbeidsforholdApiData;
}
export interface PeriodeApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}
export interface UtenlandsoppholdIPeriodenApiData extends PeriodeApiData {
    landkode: string;
    landnavn: string;
}

export interface LandApi {
    landkode: string;
    landnavn: string;
}

export interface OpptjeningIUtlandetApi {
    navn: string;
    opptjeningType: OpptjeningAktivitet;
    land: LandApi;
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}

export interface UtenlandsoppholdIPeriodenApi {
    skalOppholdeSegIUtlandetIPerioden: boolean;
    opphold: UtenlandsoppholdIPeriodenApiData[];
}

export interface UtenlandskNæringApi {
    næringstype: UtenlandskNæringstype;
    navnPåVirksomheten: string;
    land: LandApi;
    organisasjonsnummer?: string;
    fraOgMed: ISODate;
    tilOgMed?: ISODate;
}

export enum FlereSokereApiData {
    'JA' = 'JA',
    'NEI' = 'NEI',
    'USIKKER' = 'USIKKER',
}

export type DataBruktTilUtledningAnnetDataJsonString = string;

export interface SøknadApiData {
    søkerNorskIdent: string;
    id: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    pleietrengende: PleietrengendeApi;
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    dagerMedPleie: ISODate[];
    pleierDuDenSykeHjemme: boolean;
    skalJobbeOgPleieSammeDag: boolean;
    flereSokere: FlereSokereApiData;
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenApi;
    arbeidsgivere?: ArbeidsgiverApiData[];
    frilans?: FrilansApiData;
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivendeApiData;
    medlemskap: MedlemskapApiData;
    harBekreftetOpplysninger: boolean;
    vedleggUrls: string[];
    opplastetIdVedleggUrls: string[];
    harVærtEllerErVernepliktig?: boolean;
    opptjeningIUtlandet: OpptjeningIUtlandetApi[];
    utenlandskNæring: UtenlandskNæringApi[];
    dataBruktTilUtledning: DataBruktTilUtledningAnnetDataJsonString;
}
