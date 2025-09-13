import { useAppIntl } from '@i18n/index';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
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

const SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål = ({ fieldName, arbeidsforhold, søknadsperiode }: Props) => {
    const { text } = useAppIntl();
    return (
        <AnsattFormComponents.YesOrNoQuestion
            name={fieldName}
            legend={text('arbeidsforhold.sluttetFørSøknadsperiode.spm', {
                navn: arbeidsforhold.arbeidsgiver.navn,
                fraDato: dateFormatter.full(søknadsperiode.from),
            })}
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
