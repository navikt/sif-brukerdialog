import { getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { omBarnetFormComponents } from '../omBarnetFormComponents';

const { TextField } = omBarnetFormComponents;

const AnnetBarnNavnSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <TextField
            label={text('steg.omBarnet.navn')}
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
