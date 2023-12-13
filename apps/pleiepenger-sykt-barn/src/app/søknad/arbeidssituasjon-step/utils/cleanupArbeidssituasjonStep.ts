import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsforholdFormValues } from '../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { FrilansFormValues, Frilanstype } from '../../../types/søknad-form-values/FrilansFormValues';
import { SelvstendigFormValues } from '../../../types/søknad-form-values/SelvstendigFormValues';
import { StønadGodtgjørelseFormValues } from '../../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { visVernepliktSpørsmål } from './visVernepliktSpørsmål';
import { erFrilanserISøknadsperiode } from '../../../utils/frilanserUtils';

export const cleanupAnsattArbeidsforhold = (arbeidsforhold: ArbeidsforholdFormValues): ArbeidsforholdFormValues => {
    const cleanedArbeidsforhold = { ...arbeidsforhold };

    if (cleanedArbeidsforhold.erAnsatt === YesOrNo.YES) {
        cleanedArbeidsforhold.sluttetFørSøknadsperiode = undefined;
    }
    if (
        cleanedArbeidsforhold.erAnsatt === YesOrNo.NO &&
        cleanedArbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.YES
    ) {
        cleanedArbeidsforhold.normalarbeidstid = undefined;
        cleanedArbeidsforhold.sluttetFørSøknadsperiode = YesOrNo.YES;
        cleanedArbeidsforhold.arbeidIPeriode = undefined;
    }
    return cleanedArbeidsforhold;
};

export const cleanupFrilansArbeidssituasjon = (
    _søknadsperiode: DateRange,
    values: FrilansFormValues,
): FrilansFormValues => {
    /** Ikke frilanser */
    if (values.harHattInntektSomFrilanser === YesOrNo.NO) {
        return {
            harHattInntektSomFrilanser: YesOrNo.NO,
        };
    }

    /** Kun honorar og mister ikke honorar */
    if (values.frilanstype === Frilanstype.HONORAR && values.misterHonorar !== YesOrNo.YES) {
        return {
            harHattInntektSomFrilanser: YesOrNo.YES,
            frilanstype: Frilanstype.HONORAR,
            misterHonorar: YesOrNo.NO,
        };
    }

    /** Fjern verdier som ikke gjelder gitt svar fra bruker */
    const frilans: FrilansFormValues = { ...values };

    if (frilans.startetFørSisteTreHeleMåneder === YesOrNo.YES) {
        delete frilans.startdato;
    }

    if (erFrilanserISøknadsperiode(_søknadsperiode, values) === false) {
        delete frilans.arbeidsforhold;
    }
    if (frilans.frilanstype !== Frilanstype.HONORAR) {
        delete frilans.misterHonorar;
    }
    if (frilans.erFortsattFrilanser === YesOrNo.YES) {
        delete frilans.sluttdato;
    }

    return frilans;
};

export const cleanupSelvstendigArbeidssituasjon = (values: SelvstendigFormValues): SelvstendigFormValues => {
    const selvstendig: SelvstendigFormValues = { ...values };

    if (selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        delete selvstendig.harFlereVirksomheter;
        delete selvstendig.virksomhet;
        delete selvstendig.arbeidsforhold;
    }
    return selvstendig;
};

export const cleanupStønadGodtgjørelse = (values: StønadGodtgjørelseFormValues): StønadGodtgjørelseFormValues => {
    const stønadGodtgjørelse: StønadGodtgjørelseFormValues = { ...values };
    if (stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.NO) {
        stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden = undefined;
        stønadGodtgjørelse.starterUndeveis = undefined;
        stønadGodtgjørelse.startdato = undefined;
        stønadGodtgjørelse.slutterUnderveis = undefined;
        stønadGodtgjørelse.sluttdato = undefined;
    }

    if (stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden === YesOrNo.YES) {
        stønadGodtgjørelse.starterUndeveis = undefined;
        stønadGodtgjørelse.startdato = undefined;
        stønadGodtgjørelse.slutterUnderveis = undefined;
        stønadGodtgjørelse.sluttdato = undefined;
    }

    if (stønadGodtgjørelse.starterUndeveis === YesOrNo.NO) {
        stønadGodtgjørelse.startdato = undefined;
    }

    if (stønadGodtgjørelse.slutterUnderveis === YesOrNo.NO) {
        stønadGodtgjørelse.sluttdato = undefined;
    }

    return stønadGodtgjørelse;
};

export const cleanupArbeidssituasjonStep = (
    formValues: SøknadFormValues,
    søknadsperiode: DateRange,
): SøknadFormValues => {
    const values: SøknadFormValues = { ...formValues };

    values.ansatt_arbeidsforhold = values.ansatt_arbeidsforhold.map(cleanupAnsattArbeidsforhold);
    values.frilans = cleanupFrilansArbeidssituasjon(søknadsperiode, values.frilans);
    values.selvstendig = cleanupSelvstendigArbeidssituasjon(values.selvstendig);
    values.stønadGodtgjørelse = cleanupStønadGodtgjørelse(values.stønadGodtgjørelse);

    if (values.harOpptjeningUtland === YesOrNo.NO) {
        values.opptjeningUtland = [];
    }
    if (values.harUtenlandskNæring === YesOrNo.NO) {
        values.utenlandskNæring = [];
    }
    if (!visVernepliktSpørsmål(values)) {
        values.harVærtEllerErVernepliktig = undefined;
    }

    return values;
};
