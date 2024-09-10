import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { isDevMode } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { omBarnetFormComponents } from '../omBarnetFormComponents';

const { TextField } = omBarnetFormComponents;

interface Props {
    søkersFnr: string;
}

const AnnetBarnFnrSpørsmål = ({ søkersFnr }: Props) => {
    const { text } = useAppIntl();
    return (
        <TextField
            label={text('steg.omBarnet.fnr.spm')}
            name={OmBarnetFormFields.barnetsFødselsnummer}
            validate={getFødselsnummerValidator({
                required: true,
                allowHnr: isDevMode,
                disallowedValues: [søkersFnr],
            })}
            width="xl"
            type="tel"
            maxLength={11}
        />
    );
};

export default AnnetBarnFnrSpørsmål;
