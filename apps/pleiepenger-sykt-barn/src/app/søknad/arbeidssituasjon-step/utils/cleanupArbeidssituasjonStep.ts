import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsforholdFormValues } from '../../../types/_ArbeidsforholdFormValues';
import { FrilansFormData, Frilanstype } from '../../../types/_FrilansFormData';
import { SelvstendigFormData } from '../../../types/_SelvstendigFormData';
import { StønadGodtgjørelseFormData } from '../../../types/_StønadGodtgjørelseFormData';
import { SøknadFormValues } from '../../../types/_SøknadFormValues';
import { erFrilanserISøknadsperiode } from '../../../utils/frilanserUtils';
import { visVernepliktSpørsmål } from './visVernepliktSpørsmål';

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

export const cleanupFrilansArbeidssituasjon = (søknadsperiode: DateRange, values: FrilansFormData): FrilansFormData => {
    if (values.harHattInntektSomFrilanser === YesOrNo.NO) {
        return {
            harHattInntektSomFrilanser: YesOrNo.NO,
        };
    }

    const harHonorararbeid = values.frilanstyper?.includes(Frilanstype.HONORARARBEID);
    const harFrilansarbeid = values.frilanstyper?.includes(Frilanstype.FRILANSARBEID);
    const misterHonorar = values.misterHonorar === YesOrNo.YES;

    /** Kun honorararbeid og mister ikke honorar */
    if (harHonorararbeid && !harFrilansarbeid && !misterHonorar) {
        return {
            frilanstyper: [Frilanstype.HONORARARBEID],
            harHattInntektSomFrilanser: YesOrNo.YES,
            misterHonorar: YesOrNo.NO,
        };
    }

    /** Fjern verdier som ikke gjelder gitt svar fra bruker */
    const frilans: FrilansFormData = { ...values };

    if (erFrilanserISøknadsperiode(søknadsperiode, values) === false) {
        frilans.arbeidsforholdFrilansarbeid = undefined;
        frilans.arbeidsforholdHonorararbeid = undefined;
    }

    if (!harHonorararbeid) {
        frilans.misterHonorar = undefined;
        frilans.arbeidsforholdHonorararbeid = undefined;
    }
    if (!harFrilansarbeid) {
        frilans.arbeidsforholdFrilansarbeid = undefined;
    }
    if (frilans.erFortsattFrilanser === YesOrNo.YES) {
        delete frilans.sluttdato;
    }

    return frilans;
};

export const cleanupSelvstendigArbeidssituasjon = (values: SelvstendigFormData): SelvstendigFormData => {
    const selvstendig: SelvstendigFormData = { ...values };

    if (selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        delete selvstendig.harFlereVirksomheter;
        delete selvstendig.virksomhet;
        delete selvstendig.arbeidsforhold;
    }
    return selvstendig;
};

export const cleanupStønadGodtgjørelse = (values: StønadGodtgjørelseFormData): StønadGodtgjørelseFormData => {
    const stønadGodtgjørelse: StønadGodtgjørelseFormData = { ...values };
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
    søknadsperiode: DateRange
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
