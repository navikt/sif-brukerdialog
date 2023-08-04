import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { date99YearsFromNow, DateRange, ISODate } from '@navikt/sif-common-utils/lib';
import { FrilansFormField } from '../../../../../types/_FrilansFormData';
import { getFrilanserStartdatoValidator } from '../../../validation/frilansStartdatoValidator';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    startdatoValue?: ISODate;
    søknadsperiode: DateRange;
    søknadsdato: Date;
    frilansTypeTekst: string;
}

const FrilansStartdatoSpørsmål: React.FunctionComponent<Props> = ({
    startdatoValue,
    søknadsperiode,
    søknadsdato,
    frilansTypeTekst,
}) => {
    const intl = useIntl();
    return (
        <ArbFriFormComponents.DatePicker
            name={FrilansFormField.startdato}
            label={intlHelper(intl, `frilanser.nårStartet.${frilansTypeTekst}.spm`)}
            showYearSelector={true}
            maxDate={søknadsperiode.to}
            minDate={date99YearsFromNow}
            dayPickerProps={{ defaultMonth: søknadsperiode.to }}
            validate={(value) => {
                const error = getFrilanserStartdatoValidator(startdatoValue, søknadsperiode, søknadsdato)(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              frilanstyper: intlHelper(intl, `validation.frilans.startdato.${frilansTypeTekst}`),
                          },
                      }
                    : undefined;
            }}
            data-testid="er-frilanser-startdato"
        />
    );
};

export default FrilansStartdatoSpørsmål;
