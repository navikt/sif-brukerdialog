import React from 'react';
import { useAppIntl } from '@i18n/index';
import { dateFormatter, DateRange, ISODate } from '@navikt/sif-common-utils';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../../../utils/frilanserUtils';
import { getFrilanserStartdatoValidator } from '../../../validation/frilansStartdatoValidator';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    startdatoValue?: ISODate;
    søknadsperiode: DateRange;
}

const FrilansStartdatoSpørsmål: React.FunctionComponent<Props> = ({ startdatoValue, søknadsperiode }) => {
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
                const error = getFrilanserStartdatoValidator(
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
