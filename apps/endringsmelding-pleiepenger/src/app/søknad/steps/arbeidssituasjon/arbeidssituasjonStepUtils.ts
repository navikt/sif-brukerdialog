import { getNumberFromNumberInputValue, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { decimalDurationToDuration, durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { Arbeidsforhold } from '../../../types/Arbeidsforhold';
import { Arbeidsgiver } from '../../../types/Arbeidsgiver';
import { ArbeidssituasjonSøknadsdata } from '../../../types/søknadsdata/ArbeidssituasjonSøknadsdata';
import { ArbeidAktivitetEndringMap, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { ArbeidssituasjonFormValues, UkjentArbeidsforholdMap } from './ArbeidssituasjonStep';
import { ArbeidsforholdFormField, ArbeidsforholdFormValues } from './components/ArbeidsforholdForm';

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
            arbeidsforhold[a.key] = {
                erAnsatt: YesOrNo.UNANSWERED,
                timerPerUke: '',
            };
        });
    } else {
        (søknadsdata.arbeidssituasjon.arbeidsforhold || []).forEach((a) => {
            arbeidsforhold[a.arbeidsgiverKey] = arbeidsforholdSøknadsdataToFormValues(a);
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
        const arbeidsgiver = arbeidsgivere.find((a) => a.key === key);
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

export const harEndretArbeidstidForArbeidsgiver = (
    arbeidsgiverId: string,
    endringer?: ArbeidAktivitetEndringMap
): boolean => {
    const arbeidsgiverEndring = endringer ? endringer[arbeidsgiverId] : undefined;
    if (arbeidsgiverEndring) {
        return Object.keys(arbeidsgiverEndring).length > 0;
    }
    return false;
};
