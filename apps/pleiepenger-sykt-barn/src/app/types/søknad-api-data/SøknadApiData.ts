import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { OpptjeningAktivitet } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland';
import { UtenlandskNæringstype } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring';
import { UtenlandsoppholdÅrsak } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { ISODate, ISODuration } from '@navikt/sif-common-utils';
import { BarnRelasjon, ÅrsakManglerIdentitetsnummer } from '..';
import { ArbeidsgiverAnsattApiData } from './ArbeidsgiverAnsattApiData';
import { FrilansApiData } from './FrilansApiData';
import { SelvstendigApiData } from './SelvstendigApiData';
import { StønadGodtgjørelseApiData } from './StønadGodtgjørelseApiData';
import { ISODateString } from '@navikt/sif-common-formik-ds/src/components/formik-datepicker/dateFormatUtils';

export * from './ArbeidIPeriodeApiData';
export * from './ArbeidsgiverAnsattApiData';
export * from './NormalarbeidstidApiData';
export * from './ArbeidsforholdApiData';
export * from './SelvstendigApiData';
export * from './FrilansApiData';

export const SøknadApiDataVersjon = 'Søknad-1.1.0';

export interface PeriodeApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}

export interface TimerFasteDagerApiData {
    mandag?: ISODuration;
    tirsdag?: ISODuration;
    onsdag?: ISODuration;
    torsdag?: ISODuration;
    fredag?: ISODuration;
}

export interface TidEnkeltdagApiData {
    dato: ISODate;
    tid: ISODuration;
}

export enum OmsorgstilbudSvarApi {
    JA = 'JA',
    NEI = 'NEI',
    USIKKER = 'USIKKER',
}
export interface OmsorgstilbudApiData {
    erLiktHverUke?: boolean;
    svarFortid?: OmsorgstilbudSvarApi;
    svarFremtid?: OmsorgstilbudSvarApi;
    enkeltdager?: TidEnkeltdagApiData[];
    ukedager?: TimerFasteDagerApiData;
}

export interface BarnetSøknadenGjelderApiData {
    navn?: string;
    fødselsnummer?: string;
    fødselsdato?: string;
    aktørId?: string;
    sammeAdresse?: boolean;
    årsakManglerIdentitetsnummer?: ÅrsakManglerIdentitetsnummer;
}

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
}

export interface BostedUtlandApiData extends PeriodeApiData {
    landkode: string;
    landnavn: string;
}

export interface UtenlandsoppholdInnenforEØSIPeriodenApiData extends PeriodeApiData {
    erUtenforEøs: false;
    landkode: string;
    landnavn: string;
    erSammenMedBarnet: boolean;
}
export interface UtenlandsoppholdUtenforEØSIPeriodenApiData extends PeriodeApiData {
    erUtenforEøs: true;
    landkode: string;
    landnavn: string;
    erSammenMedBarnet: boolean;
    erBarnetInnlagt?: boolean;
    perioderBarnetErInnlagt: PeriodeApiData[];
    årsak: UtenlandsoppholdÅrsak | null;
}

export type UtenlandsoppholdIPeriodenApiData =
    | UtenlandsoppholdInnenforEØSIPeriodenApiData
    | UtenlandsoppholdUtenforEØSIPeriodenApiData;

export function isUtenlandsoppholdUtenforEØSApiData(
    opphold: UtenlandsoppholdIPeriodenApiData,
): opphold is UtenlandsoppholdUtenforEØSIPeriodenApiData {
    return Object.keys(opphold).includes('erBarnetInnlagt');
}

export interface FerieuttakIPeriodenApiData {
    skalTaUtFerieIPerioden: boolean;
    ferieuttak: PeriodeApiData[];
}

export interface LandApi {
    landkode: string;
    landnavn: string;
}

export interface OpptjeningIUtlandetApiData {
    navn: string;
    opptjeningType: OpptjeningAktivitet;
    land: LandApi;
    fraOgMed: ISODateString;
    tilOgMed: ISODateString;
}

export interface UtenlandskNæringApiData {
    næringstype: UtenlandskNæringstype;
    navnPåVirksomheten: string;
    land: LandApi;
    organisasjonsnummer?: string;
    fraOgMed: ISODateString;
    tilOgMed?: ISODateString;
}

export type UtenlandsoppholdIPeriodenSøknadApiData = {
    skalOppholdeSegIUtlandetIPerioden: boolean;
    opphold: UtenlandsoppholdIPeriodenApiData[];
};

export interface NattevåkApiData {
    harNattevåk: boolean;
    tilleggsinformasjon?: string;
}

export interface BeredskapApiData {
    beredskap: boolean;
    tilleggsinformasjon?: string;
}

export interface ArbeidsforholdAvsluttetFørSøknadsperiode {
    erAnsatt: false;
    sluttetFørSøknadsdato: true;
    navn?: string;
    orgnr?: string;
}

export interface DataBruktTilUtledningAnnetData {
    arbeidsforholdAvsluttetFørSøknadsperiode?: ArbeidsforholdAvsluttetFørSøknadsperiode[];
}

export type DataBruktTilUtledningAnnetDataJsonString = string;

export interface SøknadApiData {
    apiDataVersjon: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    barn: BarnetSøknadenGjelderApiData;
    barnRelasjon?: BarnRelasjon;
    barnRelasjonBeskrivelse?: string;
    vedlegg: string[];
    fødselsattestVedleggUrls: string[];
    medlemskap: MedlemskapApiData;
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenSøknadApiData;
    ferieuttakIPerioden?: FerieuttakIPeriodenApiData;
    omsorgstilbud?: OmsorgstilbudApiData;
    nattevåk?: NattevåkApiData;
    beredskap?: BeredskapApiData;
    arbeidsgivere: ArbeidsgiverAnsattApiData[];
    frilans: FrilansApiData;
    stønadGodtgjørelse: StønadGodtgjørelseApiData;
    selvstendigNæringsdrivende: SelvstendigApiData;
    harVærtEllerErVernepliktig?: boolean;
    opptjeningIUtlandet: OpptjeningIUtlandetApiData[];
    utenlandskNæring: UtenlandskNæringApiData[];
    dataBruktTilUtledning: DataBruktTilUtledningAnnetDataJsonString;
    /** Alle felter med _ brukes ikke i mottak, kun for å vise i oppsummering */
    _barnetHarIkkeFnr?: boolean;
}
