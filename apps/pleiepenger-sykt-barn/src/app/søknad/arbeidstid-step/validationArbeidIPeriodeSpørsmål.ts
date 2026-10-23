import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateRangeUtils, decimalDurationToDuration } from '@navikt/sif-common-utils';
import { getNumberValidator, getRequiredFieldValidator, ValidateNumberError } from '@sif/validation';

import { AppIntlShape } from '../../i18n';
import { ArbeidIPeriodeIntlValues } from '../../local-sif-common-pleiepenger';
import { ArbeidsukeInfo } from '../../types/ArbeidsukeInfo';
import { ArbeidIPeriodeFormField } from '../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { formatTimerOgMinutter } from '../../utils/formatTimerOgMinutter';
import { getArbeidsdagerIUkeTekst } from './utils/arbeidstidStepUtils';

const getErrorIntlKey = (field: ArbeidIPeriodeFormField, errorKey: string) =>
    `arbeidIPeriode.validation.${field}.${errorKey}`;

const getSnittTimerEnArbeidsukeErrorIntlKey = (field: ArbeidIPeriodeFormField, errorKey: string) =>
    `arbeidIPeriode.validation.${field}.UKE.${errorKey}`;

export const getArbeidIPeriodeArbeiderIPeriodenValidator = (intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: getErrorIntlKey(ArbeidIPeriodeFormField.arbeiderIPerioden, error),
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : error;
};

export const getArbeidIPeriodeErLiktHverUkeValidator = (intlValues: ArbeidIPeriodeIntlValues) => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: getErrorIntlKey(ArbeidIPeriodeFormField.erLiktHverUke, error),
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : undefined;
};

export const getArbeidIPeriodeSnittTimerPerUkeValidator =
    (intl: AppIntlShape, intlValues: ArbeidIPeriodeIntlValues, timerNormalt: number) => (value: string) => {
        const min = 1;
        const error = getNumberValidator({ required: true, min, max: timerNormalt })(value);

        if (error) {
            return {
                key: getErrorIntlKey(ArbeidIPeriodeFormField.snittTimerPerUke, error),
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
    (appIntl: AppIntlShape, intlValues: ArbeidIPeriodeIntlValues, timerNormalt: number, arbeidsuke: ArbeidsukeInfo) =>
    (value: string) => {
        const min = 0;
        const error = getNumberValidator({ required: true, min, max: timerNormalt })(value);

        if (error) {
            return {
                key: getSnittTimerEnArbeidsukeErrorIntlKey(ArbeidIPeriodeFormField.snittTimerPerUke, error),
                values: {
                    ...intlValues,
                    ukenummer: arbeidsuke.ukenummer,
                    min,
                    max: formatTimerOgMinutter(appIntl, decimalDurationToDuration(timerNormalt)),
                },
                keepKeyUnaltered: true,
            };
        }

        if (arbeidsuke.arbeidsdagerPeriode !== undefined) {
            const maksTimerIPeriode = getMaksArbeidstimerIPeriode(arbeidsuke.arbeidsdagerPeriode);
            const forMangeTimerUtFraDagerError = getNumberValidator({ required: true, min, max: maksTimerIPeriode })(
                value,
            );

            if (forMangeTimerUtFraDagerError && forMangeTimerUtFraDagerError === ValidateNumberError.numberIsTooLarge) {
                return {
                    key: getSnittTimerEnArbeidsukeErrorIntlKey(
                        ArbeidIPeriodeFormField.snittTimerPerUke,
                        'flereTimerEnnTilgjengeligIUke',
                    ),
                    values: {
                        ...intlValues,
                        ukenummer: arbeidsuke.ukenummer,
                        min,
                        max: formatTimerOgMinutter(appIntl, decimalDurationToDuration(maksTimerIPeriode)),
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
