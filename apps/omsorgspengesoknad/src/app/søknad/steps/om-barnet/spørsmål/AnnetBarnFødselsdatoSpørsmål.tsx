import { getDateValidator, ValidateDateError, ValidateDateErrorKeys } from '@navikt/sif-validation';
import { dateFormatter, getDateToday } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../../../i18n';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { getMinDatoForBarnetsFødselsdato, isBarnOver18år } from '../omBarnetStepUtils';

const { DatePicker } = omBarnetFormComponents;

const BarnOver18årErrorKey = 'barnOver18år';

export const AnnetBarnFødselsdatoValidationErrorKeys = [
    ...ValidateDateErrorKeys.filter((key) => !key.includes(ValidateDateError.dateIsNotWeekday)),
    BarnOver18årErrorKey,
];

const AnnetBarnFødselsdatoSpørsmål = () => {
    const { text } = useAppIntl();
    const minDatoForBarnetsFødselsdato = getMinDatoForBarnetsFødselsdato();
    return (
        <DatePicker
            name={OmBarnetFormFields.barnetsFødselsdato}
            label={text('steg.omBarnet.spm.fødselsdato.label')}
            validate={(value) => {
                const dateValidationerror = getDateValidator({
                    required: true,
                    max: getDateToday(),
                })(value);
                if (dateValidationerror) {
                    return dateValidationerror;
                }
                if (isBarnOver18år(value)) {
                    return {
                        key: BarnOver18årErrorKey,
                    };
                }
                return undefined;
            }}
            minDate={minDatoForBarnetsFødselsdato}
            maxDate={getDateToday()}
            dropdownCaption={true}
            description={text('steg.omBarnet.spm.fødselsdato.info', {
                minFødselsdato: dateFormatter.full(minDatoForBarnetsFødselsdato),
            })}
        />
    );
};

export default AnnetBarnFødselsdatoSpørsmål;
