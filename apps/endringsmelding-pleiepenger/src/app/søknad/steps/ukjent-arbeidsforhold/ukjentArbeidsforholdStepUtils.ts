import { getNumberFromNumberInputValue, IntlErrorObject, YesOrNo } from '@navikt/sif-common-formik-ds';
import { decimalDurationToDuration, durationToDecimalDuration } from '@navikt/sif-common-utils';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { Arbeidsforhold, Arbeidsgiver, UkjentArbeidsforholdSøknadsdata } from '@types';
import {
    UkjentArbeidsforholdArbeidsgiverFormValues,
    UkjentArbeidsforholdArbeidsgiverMap,
    UkjentArbeidsforholdFormValues,
    UkjentArbeidsgiverFormField,
} from './UkjentArbeidsforholdForm';

const arbeidsforholdSøknadsdataToFormValues = (
    arbeidsforhold: Arbeidsforhold,
): UkjentArbeidsforholdArbeidsgiverFormValues => {
    return arbeidsforhold.erAnsatt
        ? {
              erAnsatt: YesOrNo.YES,
              timerPerUke: `${durationToDecimalDuration(arbeidsforhold.normalarbeidstid.timerPerUke)}`,
          }
        : {
              erAnsatt: YesOrNo.NO,
              timerPerUke: '',
          };
};

const ukjentArbeidsgiverFormValuesToSøknadsdata = (
    formValues: UkjentArbeidsforholdArbeidsgiverFormValues,
    arbeidsgiver?: Arbeidsgiver,
): Arbeidsforhold | undefined => {
    if (!arbeidsgiver) {
        return undefined;
    }
    const erAnsatt = formValues.erAnsatt === YesOrNo.YES;
    const timerPerUke = getNumberFromNumberInputValue(formValues.timerPerUke);

    if (erAnsatt && timerPerUke !== undefined) {
        return {
            erAnsatt,
            arbeidsgiverKey: arbeidsgiver.key,
            normalarbeidstid: {
                timerPerUke: decimalDurationToDuration(timerPerUke),
            },
        };
    }
    if (!erAnsatt) {
        return {
            erAnsatt,
            arbeidsgiverKey: arbeidsgiver.key,
        };
    }
    return undefined;
};

export const getUkjentArbeidsforholdStepInitialValues = (
    ukjentArbeidsforholdSøknadsdata: UkjentArbeidsforholdSøknadsdata | undefined,
    formValues: UkjentArbeidsforholdFormValues | undefined,
    arbeidsgivereIkkeISak: Arbeidsgiver[],
): UkjentArbeidsforholdFormValues => {
    if (formValues) {
        return formValues;
    }
    const arbeidsforhold: UkjentArbeidsforholdArbeidsgiverMap = {};
    if (ukjentArbeidsforholdSøknadsdata === undefined) {
        arbeidsgivereIkkeISak.forEach((a) => {
            arbeidsforhold[a.key] = {
                erAnsatt: YesOrNo.UNANSWERED,
                timerPerUke: '',
            };
        });
    } else {
        (ukjentArbeidsforholdSøknadsdata.arbeidsforhold || []).forEach((a) => {
            arbeidsforhold[a.arbeidsgiverKey] = arbeidsforholdSøknadsdataToFormValues(a);
        });
    }
    return {
        arbeidsforhold,
    };
};

export const getUkjentArbeidsforholdSøknadsdataFromFormValues = (
    values: UkjentArbeidsforholdFormValues,
    arbeidsgivere: Arbeidsgiver[],
): UkjentArbeidsforholdSøknadsdata => {
    const arbeidsforhold: Arbeidsforhold[] = [];
    Object.keys(values.arbeidsforhold).forEach((key) => {
        const arbeidsgiver = arbeidsgivere.find((a) => a.key === key);
        const data = ukjentArbeidsgiverFormValuesToSøknadsdata(values.arbeidsforhold[key], arbeidsgiver);
        if (data) {
            arbeidsforhold.push(data);
        }
    });
    return { arbeidsforhold };
};

export const getErAnsattValidator =
    (arbeidsgiverNavn: string) =>
    (value: any): IntlErrorObject | undefined => {
        const error = getYesOrNoValidator()(value);
        if (error) {
            return {
                key: `ukjentArbeidsforhold.validation.${UkjentArbeidsgiverFormField.erAnsatt}.${error}`,
                keepKeyUnaltered: true,
                values: {
                    navn: arbeidsgiverNavn,
                },
            };
        }
        return undefined;
    };

export const getTimerPerUkeValidator = (arbeidsgiverNavn: string) => (value) => {
    const error = getNumberValidator({
        allowDecimals: true,
        required: true,
        max: 100,
        min: 0,
    })(value);
    return error
        ? {
              key: `ukjentArbeidsforhold.validation.${UkjentArbeidsgiverFormField.timerPerUke}.${error}`,
              keepKeyUnaltered: true,
              values: {
                  minTimer: 0,
                  maksTimer: 100,
                  navn: arbeidsgiverNavn,
              },
          }
        : undefined;
};
