import { IntlShape } from 'react-intl';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import {
    getNumberValidator,
    getRequiredFieldValidator,
    ValidateNumberError,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { IntlErrorObject } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { dateRangeUtils, decimalDurationToDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeIntlValues } from '../../local-sif-common-pleiepenger';
import { formatTimerOgMinutter } from '../../local-sif-common-pleiepenger/components/timer-og-minutter/TimerOgMinutter';
import { getArbeidstidFastProsentValidator } from '../../local-sif-common-pleiepenger/utils/arbeidstidValidation';
import { ArbeidsukeInfo } from '../../types/ArbeidsukeInfo';
import { getArbeidsdagerIUkeTekst } from './utils/arbeidstidUtils';

export const getArbeidIPeriodeProsentAvNormaltValidator =
    (intlValues: ArbeidIPeriodeIntlValues, arbeidsuke?: ArbeidsukeInfo, frilansVervValideringString?: string) =>
    (value: string) => {
        const ukeinfo = arbeidsuke ? `${arbeidsuke.ukenummer}` : undefined;
        const { min, max } = arbeidsuke ? { min: 0, max: 100 } : { min: 1, max: 99 };
        const error = getArbeidstidFastProsentValidator({ min, max })(value);
        return error
            ? {
                  key: `validation.arbeidIPeriode.fast.${frilansVervValideringString ? 'frilansVerv.' : ''}prosent.${
                      arbeidsuke ? 'uke.' : ''
                  }${error.key}`,
                  values: { ...intlValues, min, max, ukeinfo, frilansVervValideringString },
                  keepKeyUnaltered: true,
              }
            : undefined;
    };

export const getArbeidstidTimerSnittPerUkeValidator =
    (minMax?: { min: number; max: number }) =>
    (value: any): IntlErrorObject | undefined => {
        const minMaxOptions = minMax || {
            min: 0,
            max: 100,
        };

        const error = getNumberValidator({ required: true, ...minMaxOptions })(value);
        return error
            ? {
                  key: error,
                  values: { ...minMaxOptions },
              }
            : undefined;
    };

const getMaksArbeidstimerIPeriode = (periode: DateRange): number => {
    const arbeidsdagerIPeriode = dateRangeUtils.getNumberOfDaysInDateRange(periode);
    return arbeidsdagerIPeriode * 24;
};

export const getArbeidIPeriodeTimerPerUkeISnittValidator =
    (
        intl: IntlShape,
        intlValues: ArbeidIPeriodeIntlValues,
        timerNormalt: number,
        arbeidsuke?: ArbeidsukeInfo,
        frilansVervValideringString?: string
    ) =>
    (value: string) => {
        const min = arbeidsuke ? 0 : 1;
        const ukeinfo = arbeidsuke ? `${arbeidsuke.ukenummer}` : undefined;

        const error = getArbeidstidTimerSnittPerUkeValidator({ min, max: timerNormalt })(value);

        if (error) {
            return {
                key: `validation.arbeidIPeriode.fast.${frilansVervValideringString ? 'frilansVerv.' : ''}timerPerUke.${
                    arbeidsuke ? 'uke.' : ''
                }${error.key}`,
                values: {
                    ...intlValues,
                    ukeinfo,
                    min,
                    max: formatTimerOgMinutter(intl, decimalDurationToDuration(timerNormalt)),
                    frilansVervValideringString,
                },
                keepKeyUnaltered: true,
            };
        }

        if (arbeidsuke && arbeidsuke.arbeidsdagerPeriode !== undefined) {
            const maksTimerIPeriode = getMaksArbeidstimerIPeriode(arbeidsuke.arbeidsdagerPeriode);
            const forMangeTimerUtFraDagerError = getArbeidstidTimerSnittPerUkeValidator({
                min,
                max: maksTimerIPeriode,
            })(value);
            if (
                forMangeTimerUtFraDagerError &&
                forMangeTimerUtFraDagerError.key === ValidateNumberError.numberIsTooLarge
            ) {
                return {
                    key: `validation.arbeidIPeriode.fast.${
                        frilansVervValideringString ? 'frilansVerv.' : ''
                    }timerPerUke.${arbeidsuke ? 'uke.' : ''}${'flereTimerEnnTilgjengeligIUke'}`,
                    values: {
                        ...intlValues,
                        ukeinfo,
                        min,
                        max: formatTimerOgMinutter(intl, decimalDurationToDuration(maksTimerIPeriode)),
                        dagInfo: getArbeidsdagerIUkeTekst(arbeidsuke.arbeidsdagerPeriode),
                        frilansVervValideringString,
                    },
                    keepKeyUnaltered: true,
                };
            }
        }
        return undefined;
    };

export const getArbeidIPeriodeTimerEllerProsentValidator =
    (intlValues: ArbeidIPeriodeIntlValues, frilansVerv?: string) => (value: any) => {
        const error = getRequiredFieldValidator()(value);
        if (error) {
            return {
                key: frilansVerv
                    ? `validation.arbeidIPeriode.timerEllerProsent.${frilansVerv}.${error}`
                    : `validation.arbeidIPeriode.timerEllerProsent.${error}`,
                values: { ...intlValues, min: 1, max: 99 },
                keepKeyUnaltered: true,
            };
        }
        return undefined;
    };

export const getArbeidIPeriodeArbeiderIPeriodenAnsattValidator = (intlValues: { hvor: string }) => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: 'validation.arbeidIPeriode.ansatt',
              values: intlValues,
              keepKeyUnaltered: true,
          }
        : error;
};

export const getArbeidIPeriodeArbeiderIPeriodenValidator =
    (key: string, intlValues: { hvor: string }) => (value: any) => {
        const error = getRequiredFieldValidator()(value);
        return error
            ? {
                  key,
                  values: intlValues,
                  keepKeyUnaltered: true,
              }
            : error;
    };

export const getArbeidIPeriodeArbeiderIPeriodenFrilanserValidator = () => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: 'validation.arbeidIPeriode.frilanser',
              keepKeyUnaltered: true,
          }
        : error;
};

export const getArbeidIPeriodeArbeiderIPeriodenMisterHonorararbeidValidator = () => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: 'validation.arbeidIPeriode.honorararbeid',
              keepKeyUnaltered: true,
          }
        : error;
};

export const getArbeidIPeriodeErLiktHverUkeValidator =
    (intlValues: ArbeidIPeriodeIntlValues, frilansVerv?: string) => (value: any) => {
        const error = getRequiredFieldValidator()(value);
        return error
            ? {
                  key: frilansVerv
                      ? `validation.arbeidIPeriode.erLiktHverUke.${frilansVerv}`
                      : 'validation.arbeidIPeriode.erLiktHverUke',
                  values: intlValues,
                  keepKeyUnaltered: true,
              }
            : undefined;
    };

export const getArbeidIPeriodeErLiktHverUkeFrilansVervValidator = () => (value: any) => {
    const error = getRequiredFieldValidator()(value);
    return error
        ? {
              key: 'validation.arbeidIPeriode.erLiktHverUke.frilansVerv',
              keepKeyUnaltered: true,
          }
        : undefined;
};
