import { getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { decimalDurationToDuration, durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { Arbeidsforhold } from '../../../types/Arbeidsforhold';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidssituasjonFormValues, UkjentArbeidsforholdMap } from './ArbeidssituasjonStep';
import { ArbeidsforholdFormField, ArbeidsforholdFormValues } from './components/ArbeidsforholdForm';

const arbeidsforholdSøknadsdataToFormValues = (arbeidsforhold: Arbeidsforhold): ArbeidsforholdFormValues => {
    return arbeidsforhold.erAnsatt
        ? {
              erAnsatt: YesOrNo.YES,
              timerPerUke: `${durationToDecimalDuration(arbeidsforhold.normalarbeidstid.timerPerUke)}`,
              arbeiderIPerioden: arbeidsforhold.arbeiderIPerioden,
          }
        : {
              erAnsatt: YesOrNo.NO,
              timerPerUke: '',
          };
};

const arbeidsforholdFormValuesToSøknadsdata = (
    formValues: ArbeidsforholdFormValues,
    arbeidsgiver?: Arbeidsgiver
): Arbeidsforhold | undefined => {
    if (!arbeidsgiver) {
        return undefined;
    }
    const erAnsatt = formValues.erAnsatt === YesOrNo.YES;
    const timerPerUke = getNumberFromNumberInputValue(formValues.timerPerUke);

    if (erAnsatt && timerPerUke !== undefined && formValues.arbeiderIPerioden !== undefined) {
        return {
            erAnsatt,
            arbeidsgiverId: arbeidsgiver.id,
            arbeiderIPerioden: formValues.arbeiderIPerioden,
            normalarbeidstid: {
                timerPerUke: decimalDurationToDuration(timerPerUke),
            },
        };
    }
    if (!erAnsatt) {
        return {
            erAnsatt,
            arbeidsgiverId: arbeidsgiver.id,
        };
    }
    return undefined;
};

export const getArbeidsforholdFormFieldKey = (id: string) => `a_${id}`;
export const getArbeidsgiverIdFromFormFieldKey = (id: string) => id.replace('a_', '');

export const getArbeidssituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues: ArbeidssituasjonFormValues | undefined,
    ukjenteArbeidsgivere: Arbeidsgiver[]
): ArbeidssituasjonFormValues => {
    if (formValues) {
        return formValues;
    }
    const arbeidsforhold: UkjentArbeidsforholdMap = {};
    if (søknadsdata.arbeidssituasjon === undefined) {
        ukjenteArbeidsgivere.forEach((a) => {
            arbeidsforhold[getArbeidsforholdFormFieldKey(a.id)] = {
                erAnsatt: YesOrNo.UNANSWERED,
                timerPerUke: '',
            };
        });
    } else {
        (søknadsdata.arbeidssituasjon.arbeidsforhold || []).forEach((a) => {
            arbeidsforhold[getArbeidsforholdFormFieldKey(a.arbeidsgiverId)] = arbeidsforholdSøknadsdataToFormValues(a);
        });
    }
    return {
        arbeidsforhold,
    };
};

export const getArbeidssituasjonSøknadsdataFromFormValues = (
    values: ArbeidssituasjonFormValues,
    arbeidsgivere: Arbeidsgiver[]
): ArbeidssituasjonSøknadsdata => {
    const arbeidsforhold: Arbeidsforhold[] = [];
    Object.keys(values.arbeidsforhold).forEach((key) => {
        const arbeidsgiverId = getArbeidsgiverIdFromFormFieldKey(key);
        const arbeidsgiver = arbeidsgivere.find((a) => a.id === arbeidsgiverId);
        const data = arbeidsforholdFormValuesToSøknadsdata(values.arbeidsforhold[key], arbeidsgiver);
        if (data) {
            arbeidsforhold.push(data);
        }
    });
    return { arbeidsforhold };
};

export const harSvartErIkkeAnsattHosUkjentArbeidsgiver = (arbeidsforhold: UkjentArbeidsforholdMap): boolean => {
    return Object.keys(arbeidsforhold)
        .map((key) => arbeidsforhold[key])
        .some((values) => {
            return values[ArbeidsforholdFormField.erAnsatt] === YesOrNo.NO;
        });
};
