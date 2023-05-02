import { getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { decimalDurationToDuration, durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { Arbeidsforhold } from '../../../types/Arbeidsforhold';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidsforholdMap, ArbeidssituasjonFormValues } from './ArbeidssituasjonStep';
import { ArbeidsforholdFormValues } from './components/ArbeidsforholdForm';

const arbeidsforholdSøknadsdataToFormValues = (arbeidsforhold: Arbeidsforhold): ArbeidsforholdFormValues => {
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

const arbeidsforholdFormValuesToSøknadsdata = (
    formValues: ArbeidsforholdFormValues,
    arbeidsgiverId: string
): Arbeidsforhold | undefined => {
    const erAnsatt = formValues.erAnsatt === YesOrNo.YES;
    const timerPerUke = getNumberFromNumberInputValue(formValues.timerPerUke);

    if (erAnsatt && timerPerUke !== undefined) {
        return {
            erAnsatt,
            arbeidsgiverId,
            normalarbeidstid: {
                timerPerUke: decimalDurationToDuration(timerPerUke),
            },
        };
    }
    if (!erAnsatt) {
        return {
            erAnsatt,
            arbeidsgiverId,
        };
    }
    return undefined;
};

export const getArbeidsforholdFormFieldKey = (id: string) => `a_${id}`;
export const getArbeidsgiverIdFromFormFieldKey = (id: string) => id.replace('a_', '');

export const getArbeidssituasjonStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues: ArbeidssituasjonFormValues | undefined,
    nyeArbeidsgivere: Arbeidsgiver[]
): ArbeidssituasjonFormValues => {
    if (formValues) {
        return formValues;
    }
    const arbeidsforhold: ArbeidsforholdMap = {};
    if (søknadsdata.arbeidssituasjon === undefined) {
        nyeArbeidsgivere.forEach((a) => {
            arbeidsforhold[getArbeidsforholdFormFieldKey(a.organisasjonsnummer)] = {
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
    values: ArbeidssituasjonFormValues
): ArbeidssituasjonSøknadsdata => {
    const arbeidsforhold: Arbeidsforhold[] = [];
    Object.keys(values.arbeidsforhold).forEach((key) => {
        const data = arbeidsforholdFormValuesToSøknadsdata(
            values.arbeidsforhold[key],
            getArbeidsgiverIdFromFormFieldKey(key)
        );
        if (data) {
            arbeidsforhold.push(data);
        }
    });
    return { arbeidsforhold };
};
