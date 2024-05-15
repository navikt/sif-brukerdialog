import React from 'react';
import { useAppIntl } from '@i18n/index';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
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
    søknadsperiode: DateRange;
}

const SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål: React.FunctionComponent<Props> = ({
    fieldName,
    arbeidsforhold,
    søknadsperiode,
}) => {
    const { text } = useAppIntl();
    return (
        <AnsattFormComponents.RadioGroup
            name={fieldName}
            legend={text('arbeidsforhold.sluttetFørSøknadsperiode.spm', {
                navn: arbeidsforhold.arbeidsgiver.navn,
                fraDato: dateFormatter.full(søknadsperiode.from),
            })}
            radios={[
                {
                    label: 'Ja',
                    value: YesOrNo.YES,
                },
                {
                    label: 'Nei',
                    value: YesOrNo.NO,
                },
            ]}
            value={arbeidsforhold.sluttetFørSøknadsperiode}
            data-testid="sluttet-før-søknadsperiode"
            validate={(value) => {
                const error = getRequiredFieldValidator()(value);
                return error
                    ? {
                          key: 'validation.arbeidsforhold.sluttetFørSøknadsperiode.yesOrNoIsUnanswered',
                          values: {
                              navn: arbeidsforhold.arbeidsgiver.navn,
                              fraDato: dateFormatter.full(søknadsperiode.from),
                          },
                          keepKeyUnaltered: true,
                      }
                    : undefined;
            }}
        />
    );
};

export default SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål;
