import { AppIntlShape, AppMessageKeys } from '../../../i18n';
import { ArbeidIPeriodeIntlValues, ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeFormField } from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';

type ArbeidstidSpørsmål = {
    [ArbeidIPeriodeFormField.arbeiderIPerioden]: string;
    [ArbeidIPeriodeFormField.erLiktHverUke]: string;
    [ArbeidIPeriodeFormField.timerEllerProsent]: string;
    [ArbeidIPeriodeFormField.snittTimerPerUke]: string;
    [ArbeidIPeriodeFormField.prosentAvNormalt]: string;
    [ArbeidIPeriodeFormField.arbeidsuker]: string;
};

export const getArbeidstidSpørsmålstekst = (
    { text }: AppIntlShape,
    arbeidsforholdType: ArbeidsforholdType,
    values?: ArbeidIPeriodeIntlValues,
): ArbeidstidSpørsmål => {
    return {
        [ArbeidIPeriodeFormField.arbeiderIPerioden]: text(
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.erLiktHverUke]: text(
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.erLiktHverUke, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.timerEllerProsent]: text(
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.timerEllerProsent, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.snittTimerPerUke]: text(
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.snittTimerPerUke, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.prosentAvNormalt]: text(
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.prosentAvNormalt, arbeidsforholdType),
            values,
        ),
        [ArbeidIPeriodeFormField.arbeidsuker]: text(
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeidsuker, arbeidsforholdType),
            values,
        ),
    };
};

const getSpørsmålIntlKey = (field: ArbeidIPeriodeFormField, arbeidsforholdType: ArbeidsforholdType): AppMessageKeys =>
    `arbeidIPeriode.spørsmål.${arbeidsforholdType}.${field}`;
