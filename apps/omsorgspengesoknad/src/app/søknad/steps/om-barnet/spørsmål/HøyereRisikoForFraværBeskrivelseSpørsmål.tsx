import { getStringValidator, ValidateStringError } from '@navikt/sif-validation';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';

const { Textarea } = omBarnetFormComponents;

export const HøyereRisikoForFraværBeskrivelseValidationErrorKeys = [
    ValidateStringError.stringIsTooLong,
    ValidateStringError.stringIsTooShort,
    ValidateStringError.stringHasNoValue,
    ValidateStringError.stringContainsUnicodeChacters,
];

const HøyereRisikoForFraværBeskrivelseSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <Textarea
            name={OmBarnetFormFields.høyereRisikoForFraværBeskrivelse}
            validate={(value) => {
                const error = getStringValidator({
                    minLength: 5,
                    maxLength: 1000,
                    required: true,
                })(value);

                return error;
            }}
            maxLength={1000}
            label={text('steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.label')}
        />
    );
};

export default HøyereRisikoForFraværBeskrivelseSpørsmål;
