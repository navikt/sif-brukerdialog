import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils/lib';
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
    const intl = useIntl();
    return (
        <AnsattFormComponents.RadioGroup
            name={fieldName}
            legend={intlHelper(intl, 'arbeidsforhold.sluttetFørSøknadsperiode.spm', {
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
