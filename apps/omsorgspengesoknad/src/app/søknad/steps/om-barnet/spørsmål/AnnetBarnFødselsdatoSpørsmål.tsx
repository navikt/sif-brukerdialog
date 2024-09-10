import { getDateValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { getMinDatoForBarnetsFødselsdato, isBarnOver18år } from '../omBarnetStepUtils';

const { DatePicker } = omBarnetFormComponents;

const AnnetBarnFødselsdatoSpørsmål = () => {
    const { text } = useAppIntl();
    const minDatoForBarnetsFødselsdato = getMinDatoForBarnetsFødselsdato();
    return (
        <DatePicker
            name={OmBarnetFormFields.barnetsFødselsdato}
            label={text('steg.omBarnet.fødselsdato')}
            validate={(value) => {
                const dateError = getDateValidator({
                    required: true,
                    max: getDateToday(),
                })(value);
                if (dateError) {
                    return dateError;
                }
                if (isBarnOver18år(value)) {
                    return {
                        key: 'barnOver18år',
                    };
                }
                return undefined;
            }}
            minDate={minDatoForBarnetsFødselsdato}
            maxDate={getDateToday()}
            dropdownCaption={true}
            description={text('steg.omBarnet.fødselsdato.info', {
                minFødselsdato: dateFormatter.full(minDatoForBarnetsFødselsdato),
            })}
        />
    );
};

export default AnnetBarnFødselsdatoSpørsmål;
