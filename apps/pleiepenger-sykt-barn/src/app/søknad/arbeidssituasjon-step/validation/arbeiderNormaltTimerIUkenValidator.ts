import { getNumberValidator } from '@navikt/sif-common-formik-ds/src/validation';

export const MIN_TIMER_NORMAL_ARBEIDSFORHOLD = 0;
export const MAX_TIMER_NORMAL_ARBEIDSFORHOLD = 100;
export const MAX_TIMER_NORMAL_ARBEIDSFORHOLD_DAG = 24;

const validateArbeiderNormaltTimerIUken = (value: any) => {
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
