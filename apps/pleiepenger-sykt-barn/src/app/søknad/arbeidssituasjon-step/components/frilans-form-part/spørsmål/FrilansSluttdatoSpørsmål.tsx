import React from 'react';
import { useAppIntl } from '@i18n/index';
import { DateRange, ISODate } from '@navikt/sif-common-utils';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';
import { datepickerUtils } from '@navikt/sif-common-formik-ds';
import { getFrilanserSluttdatoValidator } from '../../../validation/frilansSluttdatoValidator';
import dayjs from 'dayjs';

interface Props {
    startdatoValue?: ISODate;
    sluttdatoValue?: ISODate;
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

const FrilansSluttdatoSpørsmål: React.FunctionComponent<Props> = ({
    startdatoValue,
    sluttdatoValue,
    søknadsperiode,
    søknadsdato,
}) => {
    const { text } = useAppIntl();
    return (
        <ArbFriFormComponents.DatePicker
            name={FrilansFormField.sluttdato}
            label={text(`frilanser.sluttdato.spm`)}
            dropdownCaption={true}
            minDate={datepickerUtils.getDateFromDateString(startdatoValue) || dayjs().subtract(80, 'years').toDate()}
            maxDate={søknadsdato}
            validate={(value) => {
                const error = getFrilanserSluttdatoValidator(
                    søknadsperiode,
                    søknadsdato,
                    startdatoValue,
                    sluttdatoValue,
                )(value);

                return error
                    ? {
                          key: `${error}`,
                      }
                    : undefined;
            }}
            data-testid="er-frilanser-sluttdato"
        />
    );
};

export default FrilansSluttdatoSpørsmål;
