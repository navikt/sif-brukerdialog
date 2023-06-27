import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidsforholdFormValues } from '../../../types/ArbeidsforholdFormValues';
import { FrilansFormData, Frilanstype } from '../../../types/FrilansFormData';
import { SelvstendigFormData } from '../../../types/SelvstendigFormData';
import { StønadGodtgjørelseFormData } from '../../../types/StønadGodtgjørelseFormData';
import { SøknadFormValues } from '../../../types/SøknadFormValues';
import { erFrilanserISøknadsperiode, kunHonorararbeidUtenNormalArbeidstid } from '../../../utils/frilanserUtils';
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
    const frilans: FrilansFormData = { ...values };
    if (erFrilanserISøknadsperiode(søknadsperiode, values) === false) {
        frilans.arbeidsforhold = undefined;
    }

    if (frilans.harHattInntektSomFrilanser === YesOrNo.NO) {
        /** Er ikke frilanser i perioden */
        frilans.frilanstyper = undefined;
        frilans.misterHonorar = undefined;
        frilans.startdato = undefined;
        frilans.sluttdato = undefined;
        frilans.erFortsattFrilanser = undefined;
        frilans.arbeidsforhold = undefined;
    }
    if (frilans.harHattInntektSomFrilanser === YesOrNo.YES) {
        if (kunHonorararbeidUtenNormalArbeidstid(frilans.frilanstyper, frilans.misterHonorar)) {
            frilans.startdato = undefined;
            frilans.arbeidsforhold = undefined;
        }
        if (!frilans.frilanstyper?.some((type) => type === Frilanstype.HONORARARBEID)) {
            frilans.misterHonorar = undefined;
        }

        if (
            !frilans.frilanstyper?.some((type) => type === Frilanstype.FRILANSARBEID) &&
            frilans.arbeidsforhold?.arbeidIPeriode?.arbeiderIPerioden
        ) {
            frilans.arbeidsforhold.arbeidIPeriode.arbeiderIPerioden = undefined;
        }

        if (
            !frilans.frilanstyper?.some((type) => type === Frilanstype.HONORARARBEID) &&
            frilans.arbeidsforhold?.arbeidIPeriode?.misterHonorarerFraVervIPerioden
        ) {
            frilans.arbeidsforhold.arbeidIPeriode.misterHonorarerFraVervIPerioden = undefined;
        }

        if (frilans.erFortsattFrilanser === YesOrNo.YES) {
            frilans.sluttdato = undefined;
        }
    }

    return frilans;
};

const cleanupSelvstendigArbeidssituasjon = (values: SelvstendigFormData): SelvstendigFormData => {
    const selvstendig: SelvstendigFormData = { ...values };

    if (selvstendig.harHattInntektSomSN === YesOrNo.NO) {
        selvstendig.virksomhet = undefined;
        selvstendig.arbeidsforhold = undefined;
    }
    return selvstendig;
};

const cleanupStønadGodtgjørelse = (values: StønadGodtgjørelseFormData): StønadGodtgjørelseFormData => {
    const stønadGodtgjørelse: StønadGodtgjørelseFormData = { ...values };
    if (stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.NO) {
        stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePeroden = undefined;
        stønadGodtgjørelse.starterUndeveis = undefined;
        stønadGodtgjørelse.startdato = undefined;
        stønadGodtgjørelse.slutterUnderveis = undefined;
        stønadGodtgjørelse.sluttdato = undefined;
    }

    if (stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePeroden === YesOrNo.YES) {
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

    if (!visVernepliktSpørsmål(values)) {
        values.harVærtEllerErVernepliktig = undefined;
    }

    return values;
};
