import { IntlShape } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ArbeidIPeriodeFormField } from '../../../types/_ArbeidIPeriodeFormValues';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';

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
    aktivitetType: ArbeidsaktivitetType,
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
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.erLiktHverUke, aktivitetType),
            values
        ),
        [ArbeidIPeriodeFormField.timerEllerProsent]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.timerEllerProsent, aktivitetType),
            values
        ),
        [ArbeidIPeriodeFormField.snittTimerPerUke]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.snittTimerPerUke, aktivitetType),
            values
        ),
        [ArbeidIPeriodeFormField.prosentAvNormalt]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.prosentAvNormalt, aktivitetType),
            values
        ),
        [ArbeidIPeriodeFormField.arbeidsuker]: intlHelper(
            intl,
            getSpørsmålIntlKey(ArbeidIPeriodeFormField.arbeidsuker, aktivitetType),
            values
        ),
    };
};

const getSpørsmålIntlKey = (field: ArbeidIPeriodeFormField, aktivitetType: ArbeidsaktivitetType) =>
    `arbeidIPeriode.spørsmål.${aktivitetType}.${field}`;
