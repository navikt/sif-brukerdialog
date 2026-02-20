import { OpptjeningAktivitet, UtenlandskNæringstype, VirksomhetApiData } from '@navikt/sif-common-forms-ds';
import { ISODate, ISODateRange, ISODuration } from '@navikt/sif-common-utils';

import { JobberIPeriodeSvar } from '../../søknad/steps/arbeidstid/ArbeidstidTypes';
import { EnkeltdagEllerPeriode } from '../../søknad/steps/kurs/KursStepForm';
import { VedleggType } from '../../søknad/steps/legeerklæring/LegeerklæringForm';
import { ArbeidsgiverType } from '../Arbeidsgiver';
import { OmBarnetApiData } from './OmBarnetApiData';

export * from './OmBarnetApiData';

interface KursholderApiData {
    uuid?: string;
    navn: string;
}

export interface KursdagApiData {
    dato: ISODate;
}

export interface KursApiData {
    kursholder: KursholderApiData;
    reise:
        | {
              reiserUtenforKursdager: true;
              reisedager: ISODate[];
              reisedagerBeskrivelse?: string;
          }
        | { reiserUtenforKursdager: false }
        | undefined;
    enkeltdagEllerPeriode: EnkeltdagEllerPeriode;
    kursperioder: ISODateRange[];
    kursdager: KursdagApiData[];
}

export interface TidEnkeltdagApiData {
    dato: ISODate;
    tid: ISODuration;
}
export interface ArbeidIPeriodeApiData {
    jobberIPerioden: JobberIPeriodeSvar;
    enkeltdagerFravær: TidEnkeltdagApiData[];
}

export interface TidFasteDagerApiData {
    mandag?: ISODuration;
    tirsdag?: ISODuration;
    onsdag?: ISODuration;
    torsdag?: ISODuration;
    fredag?: ISODuration;
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

export interface MedlemskapApiData {
    harBoddIUtlandetSiste12Mnd: boolean;
    skalBoIUtlandetNeste12Mnd: boolean;
    utenlandsoppholdNeste12Mnd: BostedUtlandApiData[];
    utenlandsoppholdSiste12Mnd: BostedUtlandApiData[];
}

export interface BostedUtlandApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
}

export interface PeriodeApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
}
export interface UtenlandsoppholdApiData extends PeriodeApiData {
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

export interface UtenlandsoppholdIPeriodenApiData {
    skalOppholdeSegIUtlandetIPerioden: boolean;
    opphold: UtenlandsoppholdApiData[];
}

export interface FerieuttakIPeriodenApiData {
    skalTaUtFerieIPerioden: boolean;
    ferieuttak: PeriodeApiData[];
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
    id: string;
    søkerNorskIdent: string;
    språk: string;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    barn: OmBarnetApiData;
    kurs: KursApiData;
    arbeidsgivere?: ArbeidsgiverApiData[];
    frilans?: FrilansApiData;
    selvstendigNæringsdrivende?: SelvstendigNæringsdrivendeApiData;
    harVærtEllerErVernepliktig?: boolean;
    medlemskap: MedlemskapApiData;
    opptjeningIUtlandet: OpptjeningIUtlandetApi[];
    utenlandskNæring: UtenlandskNæringApi[];
    vedlegg: string[];
    ettersendingAvVedlegg: {
        skalEttersendeVedlegg: boolean;
        vedleggSomSkalEttersendes?: VedleggType[];
    };
    ferieuttakIPerioden?: FerieuttakIPeriodenApiData;
    utenlandsoppholdIPerioden?: UtenlandsoppholdIPeriodenApiData;
    dataBruktTilUtledningAnnetData: DataBruktTilUtledningAnnetDataJsonString;
}
