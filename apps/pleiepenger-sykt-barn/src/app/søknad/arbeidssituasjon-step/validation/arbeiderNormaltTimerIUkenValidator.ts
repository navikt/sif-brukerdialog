import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds';
import { getNumberValidator, ValidateNumberError } from '@navikt/sif-validation';

export const MIN_TIMER_NORMAL_ARBEIDSFORHOLD = 0;
export const MAX_TIMER_NORMAL_ARBEIDSFORHOLD = 100;
export const MAX_TIMER_NORMAL_ARBEIDSFORHOLD_DAG = 24;

export const validateArbeiderNormaltTimerIUken = (value: any) => {
    return getNumberValidator({
        required: true,
        min: MIN_TIMER_NORMAL_ARBEIDSFORHOLD,
        max: MAX_TIMER_NORMAL_ARBEIDSFORHOLD,
    })(value);
};

export const getArbeiderNormaltTimerIUkenValidator = (intlValues: { hvor: string; jobber: string }) => (value: any) => {
    const error = validateArbeiderNormaltTimerIUken(value);
    return error
        ? {
              key: `validation.arbeidsforhold.arbeiderNormaltTimerPerUke.${error}`,
              values: {
                  ...intlValues,
                  min: MIN_TIMER_NORMAL_ARBEIDSFORHOLD,
                  max: MAX_TIMER_NORMAL_ARBEIDSFORHOLD,
              },
              keepKeyUnaltered: true,
          }
        : undefined;
};

export const getArbeiderNormaltTimerFrilanserIUkenValidator =
    (intlValues: { hvor: string; jobber: string }) => (value: any, omsorgsstønad?: number) => {
        const baseError = validateArbeiderNormaltTimerIUken(value);

        /** Hvis vanlig validering er ok, gjør ekstra validering hvor omsorgsstønad tas med i beregningen av maks antall timer */
        let errorMedOmsorgsstønad;
        const numValue = getNumberFromNumberInputValue(value);
        if (!baseError && omsorgsstønad && numValue) {
            errorMedOmsorgsstønad = validateArbeiderNormaltTimerIUken(numValue + omsorgsstønad);
        }

        const error = errorMedOmsorgsstønad || baseError;
        return error
            ? {
                  key:
                      errorMedOmsorgsstønad && errorMedOmsorgsstønad === ValidateNumberError.numberIsTooLarge
                          ? 'validation.arbeidsforhold.arbeiderNormaltTimerPerUke.frilansOgOmsorgsstønad.numberIsTooLarge'
                          : `validation.arbeidsforhold.arbeiderNormaltTimerPerUke.${error}`,
                  values: {
                      ...intlValues,
                      min: MIN_TIMER_NORMAL_ARBEIDSFORHOLD,
                      max: MAX_TIMER_NORMAL_ARBEIDSFORHOLD,
                  },
                  keepKeyUnaltered: true,
              }
            : undefined;
    };
