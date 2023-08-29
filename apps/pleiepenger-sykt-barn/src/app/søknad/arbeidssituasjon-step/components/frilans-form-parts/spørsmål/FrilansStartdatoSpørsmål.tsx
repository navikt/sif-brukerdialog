import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, ISODate, dateFormatter } from '@navikt/sif-common-utils/lib';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getOpptjeningsperiodeStartDato } from '../../../../../utils/søknadsperiodeUtils';
import { getFrilanserStartdatoValidator } from '../../../validation/frilansStartdatoValidator';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    startdatoValue?: ISODate;
    søknadsperiode: DateRange;
}

const FrilansStartdatoSpørsmål: React.FunctionComponent<Props> = ({ startdatoValue, søknadsperiode }) => {
    const intl = useIntl();
    const minDato = getOpptjeningsperiodeStartDato(søknadsperiode);

    return (
        <ArbFriFormComponents.DatePicker
            name={FrilansFormField.startdato}
            label={intlHelper(intl, `frilanser.startdato.spm`)}
            showYearSelector={true}
            maxDate={søknadsperiode.to}
            minDate={minDato}
            dayPickerProps={{ defaultMonth: søknadsperiode.to }}
            validate={(value) => {
                const error = getFrilanserStartdatoValidator(
                    startdatoValue,
                    søknadsperiode,
                    søknadsperiode.to,
                    minDato
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
