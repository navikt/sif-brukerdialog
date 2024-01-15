import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { ArbeidIPeriodeFormField } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';

type ArbeidstidSpørsmål = {
    [ArbeidIPeriodeFormField.arbeiderIPerioden]: string;
    [ArbeidIPeriodeFormField.erLiktHverUke]: string;
    [ArbeidIPeriodeFormField.timerEllerProsent]: string;
    [ArbeidIPeriodeFormField.snittTimerPerUke]: string;
    [ArbeidIPeriodeFormField.prosentAvNormalt]: string;
    [ArbeidIPeriodeFormField.arbeidsuker]: string;
};

export const getArbeidstidSpørsmålstekst = (
    intl: IntlShape,
    arbeidsforholdType: ArbeidsforholdType,
    values?: ArbeidIPeriodeIntlValues,
): ArbeidstidSpørsmål => {
    return {
        [ArbeidIPeriodeFormField.arbeiderIPerioden]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.erLiktHverUke]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.erLiktHverUke, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.timerEllerProsent]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.timerEllerProsent, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.snittTimerPerUke]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.snittTimerPerUke, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.prosentAvNormalt]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.prosentAvNormalt, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.arbeidsuker]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeidsuker, arbeidsforholdType),
            values,
        ),
    };
};

const getSpørsmålIntlKey = (field: ArbeidIPeriodeFormField, arbeidsforholdType: ArbeidsforholdType) =>
    `arbeidIPeriode.spørsmål.${arbeidsforholdType}.${field}`;
