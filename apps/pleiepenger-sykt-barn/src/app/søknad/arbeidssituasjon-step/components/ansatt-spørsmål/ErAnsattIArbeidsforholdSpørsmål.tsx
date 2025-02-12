import React from 'react';
import { useAppIntl } from '@i18n/index';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-validation';
import {
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
} from '../../../../types/søknad-form-values/ArbeidsforholdFormValues';

const AnsattFormComponents = getTypedFormComponents<
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
    ValidationError
>();

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    fieldName: ArbeidsforholdFormField;
}

const ErAnsattIArbeidsforholdSpørsmål: React.FunctionComponent<Props> = ({ arbeidsforhold, fieldName }) => {
    const { text } = useAppIntl();
    return (
        <AnsattFormComponents.YesOrNoQuestion
            legend={text('arbeidsforhold.erAnsatt.spm', {
                navn: arbeidsforhold.arbeidsgiver.navn,
            })}
            data-testid="er-ansatt"
            name={fieldName}
            value={arbeidsforhold.erAnsatt}
            validate={(value) => {
                return getYesOrNoValidator()(value)
                    ? {
                          key: 'validation.arbeidsforhold.erAnsatt.yesOrNoIsUnanswered',
                          values: { navn: arbeidsforhold.arbeidsgiver.navn },
                          keepKeyUnaltered: true,
                      }
                    : undefined;
            }}
        />
    );
};

export default ErAnsattIArbeidsforholdSpørsmål;
