import { getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';

const { Textarea } = omBarnetFormComponents;

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
            label={text('steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.tittel')}
            data-testid="høyereRisikoForFraværBeskrivelse"
        />
    );
};

export default HøyereRisikoForFraværBeskrivelseSpørsmål;
