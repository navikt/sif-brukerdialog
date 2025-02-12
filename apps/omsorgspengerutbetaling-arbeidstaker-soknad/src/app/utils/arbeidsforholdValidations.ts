import { Arbeidsforhold, Utbetalingsårsak } from '../types/ArbeidsforholdTypes';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

export const evaluatePrevAndCurrent = (prev: boolean, curr: boolean): boolean => {
    if (prev === false) {
        return prev;
    } else {
        return curr;
    }
};

export const skalInkludereArbeidsforhold = (arbeidsforholdFormData: Arbeidsforhold): boolean => {
    const { harHattFraværHosArbeidsgiver, arbeidsgiverHarUtbetaltLønn } = arbeidsforholdFormData;
    return harHattFraværHosArbeidsgiver === YesOrNo.YES && arbeidsgiverHarUtbetaltLønn === YesOrNo.NO;
};

const validatekonfliktForklaring = (konfliktForklaring?: string): boolean => {
    return konfliktForklaring &&
        typeof konfliktForklaring === 'string' &&
        konfliktForklaring.length >= 5 &&
        konfliktForklaring.length <= 2000
        ? true
        : false;
};

export const utbetalingsårsakIsValid = ({
    utbetalingsårsak,
    konfliktForklaring,
    årsakNyoppstartet,
}: Arbeidsforhold): boolean => {
    if (utbetalingsårsak) {
        return utbetalingsårsak === Utbetalingsårsak.arbeidsgiverKonkurs
            ? true
            : utbetalingsårsak === Utbetalingsårsak.konfliktMedArbeidsgiver &&
                validatekonfliktForklaring(konfliktForklaring)
              ? true
              : utbetalingsårsak === Utbetalingsårsak.nyoppstartetHosArbeidsgiver && årsakNyoppstartet
                ? true
                : false;
    } else return false;
};

export const arbeidsforholdFormDataPartOneIsValid = (arbeidsforhold: Arbeidsforhold): boolean =>
    arbeidsforhold.harHattFraværHosArbeidsgiver === YesOrNo.NO ||
    (arbeidsforhold.harHattFraværHosArbeidsgiver === YesOrNo.YES &&
        arbeidsforhold.arbeidsgiverHarUtbetaltLønn === YesOrNo.YES) ||
    (arbeidsforhold.harHattFraværHosArbeidsgiver === YesOrNo.YES &&
        arbeidsforhold.arbeidsgiverHarUtbetaltLønn === YesOrNo.NO &&
        utbetalingsårsakIsValid(arbeidsforhold));

export const stegEnListeAvArbeidsforholdIsValid = (listeAvArbeidsforhold: Arbeidsforhold[]): boolean =>
    listeAvArbeidsforhold
        .map((arbeidsforholdFormData: Arbeidsforhold) => arbeidsforholdFormDataPartOneIsValid(arbeidsforholdFormData))
        .reduceRight(evaluatePrevAndCurrent, true);

export const arbeidsforholdIsValid = (arbeidsforhold: Arbeidsforhold): boolean =>
    arbeidsforholdFormDataPartOneIsValid(arbeidsforhold) && utbetalingsårsakIsValid(arbeidsforhold);
// TODO
// &&
// perioderIsValid(arbeidsforhold) &&
// delvisFraværIsValid(arbeidsforhold);

export const listeAvArbeidsforholdIsValid = (listeAvArbeidsforhold: Arbeidsforhold[]): boolean => {
    const mapped = listeAvArbeidsforhold.map((arbeidsforhold: Arbeidsforhold) => arbeidsforholdIsValid(arbeidsforhold));
    const isValid = mapped.reduceRight(evaluatePrevAndCurrent, true);
    return isValid;
};

export const harMinimumEtGjeldendeArbeidsforhold = (listeAvArbeidsforhold: Arbeidsforhold[]): boolean => {
    return (
        listeAvArbeidsforhold
            .map((arbeidsforhold: Arbeidsforhold) => {
                return skalInkludereArbeidsforhold(arbeidsforhold);
            })
            .filter((skalInkludere: boolean) => skalInkludere).length > 0
    );
};

const checkAlleArbeidsforhold = (
    listeAvArbeidsforhold: Arbeidsforhold[],
    verificationFunction: (arbeidsforhold: Arbeidsforhold) => boolean,
): boolean => {
    if (listeAvArbeidsforhold.length === 0) {
        return true;
    }
    return listeAvArbeidsforhold.map(verificationFunction).filter((value) => !value).length <= 0;
};

const erJaJaCombo = (arbeidsforhold: Arbeidsforhold): boolean =>
    arbeidsforhold.harHattFraværHosArbeidsgiver === YesOrNo.YES &&
    arbeidsforhold.arbeidsgiverHarUtbetaltLønn === YesOrNo.YES;

export const erNeiCombo = (arbeidsforhold: Arbeidsforhold): boolean =>
    !!(arbeidsforhold.harHattFraværHosArbeidsgiver === YesOrNo.NO);

const erJaEllerNeiNeiCombo = (arbeidsforhold: Arbeidsforhold): boolean =>
    erJaJaCombo(arbeidsforhold) || erNeiCombo(arbeidsforhold);

export const checkHarKlikketJaJaPåAlle = (listeAvArbeidsforhold: Arbeidsforhold[]): boolean => {
    return checkAlleArbeidsforhold(listeAvArbeidsforhold, erJaJaCombo);
};

export const checkHarKlikketNeiPåAlle = (listeAvArbeidsforhold: Arbeidsforhold[]): boolean => {
    return checkAlleArbeidsforhold(listeAvArbeidsforhold, erNeiCombo);
};

export const checkHarKlikketNeiElleJajaBlanding = (listeAvArbeidsforhold: Arbeidsforhold[]): boolean => {
    return (
        checkAlleArbeidsforhold(listeAvArbeidsforhold, erJaEllerNeiNeiCombo) &&
        !checkAlleArbeidsforhold(listeAvArbeidsforhold, erJaJaCombo) &&
        !checkAlleArbeidsforhold(listeAvArbeidsforhold, erNeiCombo)
    );
};
