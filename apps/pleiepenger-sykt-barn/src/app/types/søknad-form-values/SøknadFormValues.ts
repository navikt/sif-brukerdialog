import { Attachment } from '@navikt/sif-common-core-ds/src/types/Attachment';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/types';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/src/forms/opptjening-utland';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/src/forms/utenlandsk-næring';
import {
    UtenlandsoppholdEnkel,
    UtenlandsoppholdUtvidet,
} from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { BarnRelasjon, ÅrsakManglerIdentitetsnummer } from '../';
import { Arbeidsgiver } from '../Arbeidsgiver';
import { ArbeidsforholdFormValues } from './ArbeidsforholdFormValues';
import { FrilansFormValues } from './FrilansFormValues';
import { OmsorgstilbudFormValues } from './OmsorgtilbudFormValues';
import { SelvstendigFormValues } from './SelvstendigFormValues';
import { StønadGodtgjørelseFormValues } from './StønadGodtgjørelseFormValues';

export enum SøknadFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
    harBekreftetOpplysninger = 'harBekreftetOpplysninger',
    barnetsNavn = 'barnetsNavn',
    barnetsFødselsnummer = 'barnetsFødselsnummer',
    barnetsFødselsdato = 'barnetsFødselsdato',
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
    relasjonTilBarnet = 'relasjonTilBarnet',
    relasjonTilBarnetBeskrivelse = 'relasjonTilBarnetBeskrivelse',
    søknadenGjelderEtAnnetBarn = 'søknadenGjelderEtAnnetBarn',
    barnetHarIkkeFnr = 'barnetHarIkkeFnr',
    årsakManglerIdentitetsnummer = 'årsakManglerIdentitetsnummer',
    fødselsattest = 'fødselsattest',
    periodeFra = 'periodeFra',
    periodeTil = 'periodeTil',
    skalPassePåBarnetIHelePerioden = 'skalPassePåBarnetIHelePerioden',
    beskrivelseOmsorgsrolleIPerioden = 'beskrivelseOmsorgsrolleIPerioden',
    legeerklæring = 'legeerklæring',
    harBoddUtenforNorgeSiste12Mnd = 'harBoddUtenforNorgeSiste12Mnd',
    utenlandsoppholdSiste12Mnd = 'utenlandsoppholdSiste12Mnd',
    skalBoUtenforNorgeNeste12Mnd = 'skalBoUtenforNorgeNeste12Mnd',
    utenlandsoppholdNeste12Mnd = 'utenlandsoppholdNeste12Mnd',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttakIPerioden = 'ferieuttakIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
    harNattevåk = 'harNattevåk',
    harNattevåk_ekstrainfo = 'harNattevåk_ekstrainfo',
    harBeredskap = 'harBeredskap',
    harBeredskap_ekstrainfo = 'harBeredskap_ekstrainfo',
    omsorgstilbud = 'omsorgstilbud',
    omsorgstilbud_gruppe = 'omsorgstilbud_gruppe',
    omsorgstilbud__erIOmsorgstilbud_fortid = 'omsorgstilbud.erIOmsorgstilbudFortid',
    omsorgstilbud__erIOmsorgstilbud_fremtid = 'omsorgstilbud.erIOmsorgstilbudFremtid',
    omsorgstilbud__erLiktHverUke = 'omsorgstilbud.erLiktHverUke',
    omsorgstilbud__fasteDager = 'omsorgstilbud.fasteDager',
    omsorgstilbud__enkeltdager = 'omsorgstilbud.enkeltdager',
    ansatt_arbeidsforhold = 'ansatt_arbeidsforhold',
    harVærtEllerErVernepliktig = 'harVærtEllerErVernepliktig',
    frilans = 'frilans',
    stønadGodtgjørelse = 'stønadGodtgjørelse',
    selvstendig = 'selvstendig',
    frilansoppdrag = 'frilansoppdrag',
    harOpptjeningUtland = 'harOpptjeningUtland',
    opptjeningUtland = 'opptjeningUtland',
    harUtenlandskNæring = 'harUtenlandskNæring',
    utenlandskNæring = 'utenlandskNæring',
}

export interface SøknadFormValues {
    [SøknadFormField.harForståttRettigheterOgPlikter]: boolean;
    [SøknadFormField.harBekreftetOpplysninger]: boolean;
    [SøknadFormField.barnetsNavn]: string;
    [SøknadFormField.barnetsFødselsnummer]: string;
    [SøknadFormField.barnetsFødselsdato]?: string;
    [SøknadFormField.årsakManglerIdentitetsnummer]?: ÅrsakManglerIdentitetsnummer;
    [SøknadFormField.fødselsattest]: Attachment[];
    [SøknadFormField.søknadenGjelderEtAnnetBarn]: boolean;
    [SøknadFormField.barnetHarIkkeFnr]: boolean;
    [SøknadFormField.barnetSøknadenGjelder]: string;
    [SøknadFormField.relasjonTilBarnet]?: BarnRelasjon;
    [SøknadFormField.relasjonTilBarnetBeskrivelse]?: string;
    [SøknadFormField.periodeFra]?: string;
    [SøknadFormField.periodeTil]?: string;
    [SøknadFormField.skalPassePåBarnetIHelePerioden]?: YesOrNo;
    [SøknadFormField.beskrivelseOmsorgsrolleIPerioden]?: string;
    [SøknadFormField.legeerklæring]: Attachment[];
    [SøknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo;
    [SøknadFormField.utenlandsoppholdSiste12Mnd]: UtenlandsoppholdEnkel[];
    [SøknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo;
    [SøknadFormField.utenlandsoppholdNeste12Mnd]: UtenlandsoppholdEnkel[];
    [SøknadFormField.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [SøknadFormField.utenlandsoppholdIPerioden]?: UtenlandsoppholdUtvidet[];
    [SøknadFormField.skalTaUtFerieIPerioden]?: YesOrNo;
    [SøknadFormField.ferieuttakIPerioden]?: Ferieuttak[];
    [SøknadFormField.omsorgstilbud]?: OmsorgstilbudFormValues;
    [SøknadFormField.harNattevåk]: YesOrNo;
    [SøknadFormField.harNattevåk_ekstrainfo]?: string;
    [SøknadFormField.harBeredskap]: YesOrNo;
    [SøknadFormField.harBeredskap_ekstrainfo]?: string;
    [SøknadFormField.harVærtEllerErVernepliktig]?: YesOrNo;
    [SøknadFormField.frilans]: FrilansFormValues;
    [SøknadFormField.selvstendig]: SelvstendigFormValues;
    [SøknadFormField.ansatt_arbeidsforhold]: ArbeidsforholdFormValues[];
    [SøknadFormField.stønadGodtgjørelse]: StønadGodtgjørelseFormValues;
    [SøknadFormField.frilansoppdrag]: Arbeidsgiver[];
    [SøknadFormField.harOpptjeningUtland]: YesOrNo;
    [SøknadFormField.opptjeningUtland]: OpptjeningUtland[];
    [SøknadFormField.harUtenlandskNæring]: YesOrNo;
    [SøknadFormField.utenlandskNæring]: UtenlandskNæring[];
}

export const initialValues: SøknadFormValues = {
    [SøknadFormField.periodeFra]: undefined,
    [SøknadFormField.periodeTil]: undefined,
    [SøknadFormField.barnetsNavn]: '',
    [SøknadFormField.barnetsFødselsnummer]: '',
    [SøknadFormField.barnetSøknadenGjelder]: '',
    [SøknadFormField.harForståttRettigheterOgPlikter]: false,
    [SøknadFormField.harBekreftetOpplysninger]: false,
    [SøknadFormField.søknadenGjelderEtAnnetBarn]: false,
    [SøknadFormField.barnetHarIkkeFnr]: false,
    [SøknadFormField.årsakManglerIdentitetsnummer]: undefined,
    [SøknadFormField.fødselsattest]: [],
    [SøknadFormField.legeerklæring]: [],
    [SøknadFormField.ansatt_arbeidsforhold]: [],
    [SøknadFormField.barnetsFødselsdato]: undefined,
    [SøknadFormField.harBoddUtenforNorgeSiste12Mnd]: YesOrNo.UNANSWERED,
    [SøknadFormField.utenlandsoppholdSiste12Mnd]: [],
    [SøknadFormField.skalBoUtenforNorgeNeste12Mnd]: YesOrNo.UNANSWERED,
    [SøknadFormField.utenlandsoppholdNeste12Mnd]: [],
    [SøknadFormField.skalOppholdeSegIUtlandetIPerioden]: YesOrNo.UNANSWERED,
    [SøknadFormField.utenlandsoppholdIPerioden]: [],
    [SøknadFormField.skalTaUtFerieIPerioden]: YesOrNo.UNANSWERED,
    [SøknadFormField.ferieuttakIPerioden]: [],
    [SøknadFormField.omsorgstilbud]: undefined,
    [SøknadFormField.harNattevåk]: YesOrNo.UNANSWERED,
    [SøknadFormField.harBeredskap]: YesOrNo.UNANSWERED,
    [SøknadFormField.frilans]: {
        harHattInntektSomFrilanser: YesOrNo.UNANSWERED,
    },
    [SøknadFormField.stønadGodtgjørelse]: {
        mottarStønadGodtgjørelse: YesOrNo.UNANSWERED,
    },
    [SøknadFormField.selvstendig]: {
        harHattInntektSomSN: YesOrNo.UNANSWERED,
    },
    [SøknadFormField.frilansoppdrag]: [],
    [SøknadFormField.harOpptjeningUtland]: YesOrNo.UNANSWERED,
    [SøknadFormField.opptjeningUtland]: [],
    [SøknadFormField.harUtenlandskNæring]: YesOrNo.UNANSWERED,
    [SøknadFormField.utenlandskNæring]: [],
};

export type MedlemskapFormValues = Pick<
    SøknadFormValues,
    | SøknadFormField.harBoddUtenforNorgeSiste12Mnd
    | SøknadFormField.utenlandsoppholdSiste12Mnd
    | SøknadFormField.skalBoUtenforNorgeNeste12Mnd
    | SøknadFormField.utenlandsoppholdNeste12Mnd
>;

export type OmBarnetFormValues = Pick<
    SøknadFormValues,
    | SøknadFormField.barnetSøknadenGjelder
    | SøknadFormField.barnetsNavn
    | SøknadFormField.barnetsFødselsnummer
    | SøknadFormField.barnetHarIkkeFnr
    | SøknadFormField.årsakManglerIdentitetsnummer
    | SøknadFormField.barnetsFødselsdato
    | SøknadFormField.relasjonTilBarnet
    | SøknadFormField.relasjonTilBarnetBeskrivelse
    | SøknadFormField.fødselsattest
>;
