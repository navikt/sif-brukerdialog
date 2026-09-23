import { getStringValidator, ValidateStringError } from '@navikt/sif-validation';

import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';

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
