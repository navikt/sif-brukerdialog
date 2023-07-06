import { IntlShape } from 'react-intl';
import { ArbeidIPeriodeFormField } from '../../../types/ArbeidIPeriodeFormValues';
import { RedusertArbeidAktivitetType } from './ArbeidRedusertPart';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

// type SpørsmålIntlKeys = {
//     spørsmål: string;
//     validation: string;
// };

type ArbeidstidSpørsmål = {
    [ArbeidIPeriodeFormField.arbeiderIPerioden]: string;
    [ArbeidIPeriodeFormField.erLiktHverUke]: string;
    // [ArbeidIPeriodeFormField.timerEllerProsent]: SpørsmålIntlKeys;
    // [ArbeidIPeriodeFormField.snittTimerPerUke]: SpørsmålIntlKeys;
    // [ArbeidIPeriodeFormField.prosentAvNormalt]: SpørsmålIntlKeys;
    // [ArbeidIPeriodeFormField.arbeidsuker]: SpørsmålIntlKeys;
};

export const getArbeidstidSpørsmål = (
    intl: IntlShape,
    aktivitetType: RedusertArbeidAktivitetType,
    values?: { arbeidsgiverNavn?: string }
): ArbeidstidSpørsmål => {
    return {
        [ArbeidIPeriodeFormField.arbeiderIPerioden]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, aktivitetType),
            values
        ),
        [ArbeidIPeriodeFormField.erLiktHverUke]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, aktivitetType),
            values
        ),
    };
};

export const getArbeidstidValidationIntlKey = (aktivitetType: RedusertArbeidAktivitetType): ArbeidstidSpørsmål => {
    return {
        [ArbeidIPeriodeFormField.arbeiderIPerioden]: getValidationIntlKey(
            ArbeidIPeriodeFormField.arbeiderIPerioden,
            aktivitetType
        ),

        [ArbeidIPeriodeFormField.erLiktHverUke]: getValidationIntlKey(
            ArbeidIPeriodeFormField.arbeiderIPerioden,
            aktivitetType
        ),
    };
};

const getSpørsmålIntlKey = (field: ArbeidIPeriodeFormField, aktivitetType: RedusertArbeidAktivitetType) =>
    `arbeidIPeriode.spørsmål.${field}.${aktivitetType}`;

const getValidationIntlKey = (field: ArbeidIPeriodeFormField, aktivitetType: RedusertArbeidAktivitetType) =>
    `arbeidIPeriode.validation.${field}.${aktivitetType}`;

// const getArbeidstidSpørsmålIntlKeys = (
//     field: ArbeidIPeriodeFormField,
//     aktivitetType: RedusertArbeidAktivitetType
// ): SpørsmålIntlKeys => {
//     return {
//         spørsmål: `arbeidIPeriode.spørsmål.${field}.${aktivitetType}`,
//         validation: `arbeidIPeriode.validation.${field}.${aktivitetType}`,
//     };
// };

// export const getArbeidstidIntlKeys = (aktivitetType: RedusertArbeidAktivitetType): ArbeidstidSpørsmålIntlKeys => {
//     return {
//         [ArbeidIPeriodeFormField.arbeiderIPerioden]: getArbeidstidSpørsmålIntlKeys(
//             ArbeidIPeriodeFormField.arbeiderIPerioden,
//             aktivitetType
//         ),
//         // [ArbeidIPeriodeFormField.erLiktHverUke]: `arbeidIPeriode.spørsmål.erLiktHverUke.${aktivitetType}.spm`,
//         // [ArbeidIPeriodeFormField.timerEllerProsent]: `arbeidIPeriode.spørsmål.timerEllerProsent.${aktivitetType}.spm`,
//         // [ArbeidIPeriodeFormField.snittTimerPerUke]: `arbeidIPeriode.spørsmål.snittTimerPerUke.${aktivitetType}.spm`,
//         // [ArbeidIPeriodeFormField.prosentAvNormalt]: `arbeidIPeriode.spørsmål.prosentAvNormalt.${aktivitetType}.spm`,
//         // [ArbeidIPeriodeFormField.arbeidsuker]: `arbeidIPeriode.spørsmål.arbeidsuker.${aktivitetType}.spm`,
//     };
// };

// export const getArbeiderIPeriodenSpørsmål = (
//     intl: IntlShape,
//     aktivitetType: RedusertArbeidAktivitetType,
//     values: { arbeidsgiverNavn?: string }
// ): string => {
//     return intlHelper(intl, getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, aktivitetType), values);
// };
