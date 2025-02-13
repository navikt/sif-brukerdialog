import { getNumberValidator } from '@navikt/sif-validation';

export const MIN_TIMER_NORMAL_ARBEIDSFORHOLD = 0.01;
export const MAX_TIMER_NORMAL_ARBEIDSFORHOLD = 100;

export const getJobberNormaltTimerValidator = (intlValues: { hvor: string; jobber: string }) => (value: any) => {
    const error = getNumberValidator({
        required: true,
        min: MIN_TIMER_NORMAL_ARBEIDSFORHOLD,
        max: MAX_TIMER_NORMAL_ARBEIDSFORHOLD,
    })(value);

    return error
        ? {
              key: `validation.arbeidsforhold.jobberNormaltTimer.${error}`,
              values: {
                  ...intlValues,
                  min: MIN_TIMER_NORMAL_ARBEIDSFORHOLD,
                  max: MAX_TIMER_NORMAL_ARBEIDSFORHOLD,
              },
              keepKeyUnaltered: true,
          }
        : undefined;
};
