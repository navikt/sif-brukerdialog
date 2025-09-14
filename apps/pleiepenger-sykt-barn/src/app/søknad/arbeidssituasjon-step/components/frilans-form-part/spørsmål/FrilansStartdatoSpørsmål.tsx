import { useAppIntl } from '@i18n/index';
import { dateFormatter, DateRange, ISODate } from '@navikt/sif-common-utils';

import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../../../utils/frilanserUtils';
import { getFrilansStartdatoValidator } from '../../../validation/frilansStartdatoValidator';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    startdatoValue?: ISODate;
    søknadsperiode: DateRange;
}

const FrilansStartdatoSpørsmål = ({ startdatoValue, søknadsperiode }: Props) => {
    const { text } = useAppIntl();
    const minDato = getStartdatoForNySomFrilanser(søknadsperiode);

    return (
        <ArbFriFormComponents.DatePicker
            name={FrilansFormField.startdato}
            label={text(`frilanser.startdato.spm`)}
            dropdownCaption={true}
            maxDate={søknadsperiode.to}
            minDate={minDato}
            defaultMonth={søknadsperiode.to}
            validate={(value) => {
                const error = getFrilansStartdatoValidator(
                    startdatoValue,
                    søknadsperiode,
                    søknadsperiode.to,
                    minDato,
                )(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              minDato: dateFormatter.dateShortMonthYear(minDato),
                          },
                      }
                    : undefined;
            }}
            data-testid="er-frilanser-startdato"
        />
    );
};

export default FrilansStartdatoSpørsmål;
