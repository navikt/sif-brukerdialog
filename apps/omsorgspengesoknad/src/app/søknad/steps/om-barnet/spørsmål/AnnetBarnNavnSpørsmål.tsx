import { getStringValidator, ValidateStringError } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { omBarnetFormComponents } from '../omBarnetFormComponents';

const { TextField } = omBarnetFormComponents;

export const AnnetBarnNavnValidationErrorKeys = [
    ValidateStringError.stringIsTooLong,
    ValidateStringError.stringHasNoValue,
];

const AnnetBarnNavnSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <TextField
            label={text('steg.omBarnet.spm.barnetsNavn.label')}
            name={OmBarnetFormFields.barnetsNavn}
            width="xl"
            validate={(value) => {
                const error = getStringValidator({ required: true, maxLength: 50 })(value);
                return error ? { key: error, values: { maks: 50 } } : undefined;
            }}
        />
    );
};

export default AnnetBarnNavnSpørsmål;
