import { getFødselsnummerValidator, ValidateFødselsnummerErrorKeys } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';

const { TextField } = omBarnetFormComponents;

interface Props {
    søkersFnr: string;
    allowHnr?: boolean;
}

export const AnnetBarnFnrValidationErrorKeys = ValidateFødselsnummerErrorKeys;

const AnnetBarnFnrSpørsmål = ({ søkersFnr, allowHnr }: Props) => {
    const { text } = useAppIntl();
    return (
        <TextField
            label={text('steg.omBarnet.spm.barnetsFødselsnummer.label')}
            name={OmBarnetFormFields.barnetsFødselsnummer}
            validate={getFødselsnummerValidator({
                required: true,
                allowHnr,
                disallowedValues: [søkersFnr],
            })}
            width="xl"
            type="tel"
            maxLength={11}
        />
    );
};

export default AnnetBarnFnrSpørsmål;
