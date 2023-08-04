import { IntlShape } from 'react-intl';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import {
    getNumberValidator,
    getRequiredFieldValidator,
    ValidateNumberError,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { dateRangeUtils, decimalDurationToDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeIntlValues } from '../../local-sif-common-pleiepenger';
import { formatTimerOgMinutter } from '../../local-sif-common-pleiepenger/components/timer-og-minutter/TimerOgMinutter';
import { getArbeidstidFastProsentValidator } from '../../local-sif-common-pleiepenger/utils/arbeidstidValidation';
import { ArbeidIPeriodeFormField } from '../../types/_ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../types/_ArbeidsukeInfo';
import { ArbeidsaktivitetType } from './ArbeidstidStep';
import { getArbeidsdagerIUkeTekst } from './utils/arbeidstidUtils';

const getErrorIntlKey = (field: ArbeidIPeriodeFormField, aktivitetType: ArbeidsaktivitetType, errorKey: string) =>
    `arbeidIPeriode.validation.${aktivitetType}.${field}.${errorKey}`;

const getSnittTimerEnArbeidsukeErrorIntlKey = (
    field: ArbeidIPeriodeFormField,
    aktivitetType: ArbeidsaktivitetType,
    errorKey: string
) => `arbeidIPeriode.validation.${aktivitetType}.${field}.UKE.${errorKey}`;

export const getArbeidIPeriodeArbeiderIPeriodenValidator =
    (arbeidsaktivitetType: ArbeidsaktivitetType, intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
        const error = getRequiredFieldValidator()(value);
        return error
            ? {
                  key: getErrorIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, arbeidsaktivitetType, error),
                  values: intlValues,
                  keepKeyUnaltered: true,
              }
            : error;
    };

export const getArbeidIPeriodeErLiktHverUkeValidator =
    (arbeidsaktivitetType: ArbeidsaktivitetType, intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
        const error = getRequiredFieldValidator()(value);
        return error
            ? {
                  key: getErrorIntlKey(ArbeidIPeriodeFormField.erLiktHverUke, arbeidsaktivitetType, error),
                  values: intlValues,
                  keepKeyUnaltered: true,
              }
            : undefined;
    };

export const getArbeidIPeriodeTimerEllerProsentValidator =
    (arbeidsaktivitetType: ArbeidsaktivitetType, intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
        const error = getRequiredFieldValidator()(value);
        if (error) {
            return {
                key: getErrorIntlKey(ArbeidIPeriodeFormField.timerEllerProsent, arbeidsaktivitetType, error),
                values: intlValues,
                keepKeyUnaltered: true,
            };
        }
        return undefined;
    };

export const getArbeidIPeriodeProsentAvNormaltValidator =
    (arbeidsaktivitetType: ArbeidsaktivitetType, intlValues: ArbeidIPeriodeIntlValues, ukenummer?: number) =>
    (value: string) => {
        const ukeinfo = ukenummer !== undefined ? `${ukenummer}` : undefined;
        const { min, max } = ukeinfo ? { min: 0, max: 100 } : { min: 1, max: 99 };
        const error = getArbeidstidFastProsentValidator({ min, max })(value);
        return error
            ? {
                  key: getErrorIntlKey(ArbeidIPeriodeFormField.prosentAvNormalt, arbeidsaktivitetType, error.key),
                  values: { ...intlValues, min, max, ukeinfo },
                  keepKeyUnaltered: true,
              }
            : undefined;
    };

export const getArbeidIPeriodeSnittTimerPerUkeValidator =
    (
        arbeidsaktivitetType: ArbeidsaktivitetType,
        intl: IntlShape,
        intlValues: ArbeidIPeriodeIntlValues,
        timerNormalt: number
    ) =>
    (value: string) => {
        const min = 1;
        const error = getNumberValidator({ required: true, min, max: timerNormalt })(value);

        if (error) {
            return {
                key: getErrorIntlKey(ArbeidIPeriodeFormField.snittTimerPerUke, arbeidsaktivitetType, error),
                values: {
                    ...intlValues,
                    min,
                    max: formatTimerOgMinutter(intl, decimalDurationToDuration(timerNormalt)),
                },
                keepKeyUnaltered: true,
            };
        }

        return undefined;
    };

export const getArbeidIPeriodeSnittTimerEnArbeidsukeValidator =
    (
        arbeidsaktivitetType: ArbeidsaktivitetType,
        intl: IntlShape,
        intlValues: ArbeidIPeriodeIntlValues,
        timerNormalt: number,
        arbeidsuke: ArbeidsukeInfo
    ) =>
    (value: string) => {
        const min = 0;
        const error = getNumberValidator({ required: true, min, max: timerNormalt })(value);

        if (error) {
            return {
                key: getSnittTimerEnArbeidsukeErrorIntlKey(
                    ArbeidIPeriodeFormField.snittTimerPerUke,
                    arbeidsaktivitetType,
                    error
                ),
                values: {
                    ...intlValues,
                    ukenummer: arbeidsuke.ukenummer,
                    min,
                    max: formatTimerOgMinutter(intl, decimalDurationToDuration(timerNormalt)),
                },
                keepKeyUnaltered: true,
            };
        }

        if (arbeidsuke.arbeidsdagerPeriode !== undefined) {
            const maksTimerIPeriode = getMaksArbeidstimerIPeriode(arbeidsuke.arbeidsdagerPeriode);
            const forMangeTimerUtFraDagerError = getNumberValidator({ required: true, min, max: maksTimerIPeriode })(
                value
            );

            if (forMangeTimerUtFraDagerError && forMangeTimerUtFraDagerError === ValidateNumberError.numberIsTooLarge) {
                return {
                    key: getSnittTimerEnArbeidsukeErrorIntlKey(
                        ArbeidIPeriodeFormField.snittTimerPerUke,
                        arbeidsaktivitetType,
                        'flereTimerEnnTilgjengeligIUke'
                    ),
                    values: {
                        ...intlValues,
                        ukenummer: arbeidsuke.ukenummer,
                        min,
                        max: formatTimerOgMinutter(intl, decimalDurationToDuration(maksTimerIPeriode)),
                        dagInfo: getArbeidsdagerIUkeTekst(arbeidsuke.arbeidsdagerPeriode),
                    },
                    keepKeyUnaltered: true,
                };
            }
        }
        return undefined;
    };

const getMaksArbeidstimerIPeriode = (periode: DateRange): number => {
    const arbeidsdagerIPeriode = dateRangeUtils.getNumberOfDaysInDateRange(periode);
    return arbeidsdagerIPeriode * 24;
};
