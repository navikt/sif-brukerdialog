import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, ISODate } from '@navikt/sif-common-utils/lib';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';
import datepickerUtils from '@navikt/sif-common-formik-ds/lib/components/formik-datepicker/datepickerUtils';
import { getFrilanserSluttdatoValidator } from '../../../validation/frilansSluttdatoValidator';

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
    const intl = useIntl();
    return (
        <ArbFriFormComponents.DatePicker
            name={FrilansFormField.sluttdato}
            label={intlHelper(intl, `frilanser.sluttdato.spm`)}
            showYearSelector={true}
            minDate={datepickerUtils.getDateFromDateString(startdatoValue)}
            maxDate={søknadsdato}
            validate={(value) => {
                const error = getFrilanserSluttdatoValidator(
                    søknadsperiode,
                    søknadsdato,
                    startdatoValue,
                    sluttdatoValue
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
