import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { OpptjeningUtland } from '@navikt/sif-common-forms-ds/lib/forms/opptjening-utland';
import { UtenlandskNæring } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsk-næring';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { ArbeidsgiverType } from '../../types';
import { ArbeidsforholdFormValues } from '../../types/ArbeidsforholdFormValues';
// import { FrilansFormData } from '../../types/FrilansFormData';
import { SøknadsimportEndring, SøknadsimportEndringstype } from '../../types/ImportertSøknad';
import { InnsendtSøknadInnhold } from '../../types/InnsendtSøknad';
import { SelvstendigFormData } from '../../types/SelvstendigFormData';
import { OrganisasjonArbeidsgiverApiData } from '../../types/søknad-api-data/arbeidsgiverApiData';
// import { FrilansApiData } from '../../types/søknad-api-data/frilansApiData';
import { SelvstendigApiData } from '../../types/søknad-api-data/selvstendigApiData';
import { OpptjeningIUtlandetApiData, UtenlandskNæringApiData } from '../../types/søknad-api-data/SøknadApiData';
import { SøknadFormField, SøknadFormValues } from '../../types/SøknadFormValues';
import { booleanToYesOrNo } from '../booleanToYesOrNo';
import { arbeidsgiverHarOrganisasjonsnummer } from './extractFormValuesUtils';
import { mapArbeidIPeriodeApiDataToFormValues } from './mapArbeidIPeriodeToFormValues';
import { mapNormalarbeidstidApiDataToFormValues } from './mapNormalarbeidstidToFormValues';
import { mapOpptjeningIUtlandetApiDataToOpptjeningUtland } from './mapOpptjeningIUtlandetApiDataToOpptjeningUtland';
import { mapUtenlandskNæringApiDataToUtenlandskNæring } from './mapUtenlandskNæringApiDataToUtenlandskNæring';
import { mapVirksomhetApiDataToVirksomhet } from './mapVirksomhetApiDataToVirksomhet';

dayjs.extend(isSameOrAfter);

type ArbeidFormValues = Pick<
    SøknadFormValues,
    //  | SøknadFormField.frilans
    | SøknadFormField.frilansoppdrag
    | SøknadFormField.ansatt_arbeidsforhold
    | SøknadFormField.opptjeningUtland
    | SøknadFormField.selvstendig
    | SøknadFormField.utenlandskNæring
    | SøknadFormField.harOpptjeningUtland
    | SøknadFormField.harUtenlandskNæring
>;

export const mapArbeidsgiverToFormValues = (
    arbeidsgiver: OrganisasjonArbeidsgiverApiData
): ArbeidsforholdFormValues => {
    const formValues: ArbeidsforholdFormValues = {
        arbeidsgiver: {
            ...arbeidsgiver,
            id: arbeidsgiver.organisasjonsnummer,
            type: ArbeidsgiverType.ORGANISASJON,
            ansattFom: arbeidsgiver.ansattFom !== undefined ? ISODateToDate(arbeidsgiver.ansattFom) : undefined,
            ansattTom: arbeidsgiver.ansattTom !== undefined ? ISODateToDate(arbeidsgiver.ansattTom) : undefined,
        },
        erAnsatt: booleanToYesOrNo(arbeidsgiver.erAnsatt),
        sluttetFørSøknadsperiode: arbeidsgiver.erAnsatt ? YesOrNo.NO : YesOrNo.UNANSWERED,
        normalarbeidstid: mapNormalarbeidstidApiDataToFormValues(arbeidsgiver.arbeidsforhold?.normalarbeidstid),
        arbeidIPeriode: mapArbeidIPeriodeApiDataToFormValues(arbeidsgiver.arbeidsforhold?.arbeidIPeriode),
    };
    return formValues;
};

//TODO - denne må endres dersom vi skrur på preutfylling
/*export const mapFrilanserToFormValues = (frilanser: FrilansApiData): FrilansFormData => {
    if (frilanser.harInntektSomFrilanser) {
        return {
            harHattInntektSomFrilanser: YesOrNo.YES,
            startdato: frilanser.startdato,
            arbeidsforhold: {
                arbeidIPeriode: mapArbeidIPeriodeApiDataToFormValues(frilanser.arbeidsforhold.arbeidIPeriode),
                normalarbeidstid: mapNormalarbeidstidApiDataToFormValues(frilanser.arbeidsforhold.normalarbeidstid),
                sluttetFørSøknadsperiode: YesOrNo.NO,
            },
        };
    }
    return {
        harHattInntektSomFrilanser: YesOrNo.NO,
    };
};*/

export const mapSelvstendigToFormValues = (selvstendig: SelvstendigApiData): SelvstendigFormData => {
    if (selvstendig.harInntektSomSelvstendig) {
        return {
            harHattInntektSomSN: YesOrNo.YES,
            harFlereVirksomheter: YesOrNo.NO,
            virksomhet: mapVirksomhetApiDataToVirksomhet(selvstendig.virksomhet),
            arbeidsforhold: {
                arbeidIPeriode: mapArbeidIPeriodeApiDataToFormValues(selvstendig.arbeidsforhold.arbeidIPeriode),
                normalarbeidstid: mapNormalarbeidstidApiDataToFormValues(selvstendig.arbeidsforhold.normalarbeidstid),
            },
        };
    }
    return {
        harHattInntektSomSN: YesOrNo.NO,
    };
};

export const datoErInnenforSiste3Måneder = (dato: Date): boolean => {
    return dayjs(dato).isSameOrAfter(dayjs().subtract(3, 'months'), 'day');
};

export const extractOpptjeningUtlandFormValues = (opptjening: OpptjeningIUtlandetApiData[]): OpptjeningUtland[] => {
    const result = opptjening.map(mapOpptjeningIUtlandetApiDataToOpptjeningUtland);
    return result.filter((o) => (o.tom ? datoErInnenforSiste3Måneder(o.tom) : true));
};

export const extractUtenlandskNæringFormValues = (utenlandskNæring: UtenlandskNæringApiData[]): UtenlandskNæring[] => {
    const result = utenlandskNæring.map(mapUtenlandskNæringApiDataToUtenlandskNæring);
    return result.filter((u) => (u.tilOgMed ? datoErInnenforSiste3Måneder(u.tilOgMed) : true));
};

export const extractArbeidFormValues = (
    søknad: InnsendtSøknadInnhold
): { formValues: ArbeidFormValues; endringer: SøknadsimportEndring[] } => {
    const ansatt_arbeidsforhold = søknad.arbeidsgivere
        .filter(arbeidsgiverHarOrganisasjonsnummer)
        .map((a) => mapArbeidsgiverToFormValues(a));

    const opptjeningUtland = extractOpptjeningUtlandFormValues(søknad.opptjeningIUtlandet);
    const utenlandskNæring = extractUtenlandskNæringFormValues(søknad.utenlandskNæring);

    const endringer: SøknadsimportEndring[] = [];
    if (opptjeningUtland.length !== søknad.opptjeningIUtlandet.length) {
        endringer.push({
            type: SøknadsimportEndringstype.endretOpptjeningUtlandet,
        });
    }
    if (utenlandskNæring.length !== søknad.utenlandskNæring.length) {
        endringer.push({
            type: SøknadsimportEndringstype.endretUtenlandskNæring,
        });
    }

    const formValues = {
        ansatt_arbeidsforhold: ansatt_arbeidsforhold,
        // frilans: mapFrilanserToFormValues(søknad.frilans),
        frilansoppdrag: [],
        selvstendig: mapSelvstendigToFormValues(søknad.selvstendigNæringsdrivende),
        harOpptjeningUtland: booleanToYesOrNo(søknad.opptjeningIUtlandet.length > 0),
        harUtenlandskNæring: booleanToYesOrNo(søknad.utenlandskNæring.length > 0),
        opptjeningUtland,
        utenlandskNæring,
    };

    return { formValues, endringer };
};
