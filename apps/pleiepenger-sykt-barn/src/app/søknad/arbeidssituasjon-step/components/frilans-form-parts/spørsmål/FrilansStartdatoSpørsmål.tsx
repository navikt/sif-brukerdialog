import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { date99YearsFromNow, DateRange, ISODate } from '@navikt/sif-common-utils/lib';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getFrilanserStartdatoValidator } from '../../../validation/frilansStartdatoValidator';
import { ArbFriFormComponents } from '../FrilanserFormPart';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';

interface Props {
    startdatoValue?: ISODate;
    søknadsperiode: DateRange;
    søknadsdato: Date;
}

const FrilansStartdatoSpørsmål: React.FunctionComponent<Props> = ({ startdatoValue, søknadsperiode, søknadsdato }) => {
    const intl = useIntl();
    return (
        <ArbFriFormComponents.DatePicker
            name={FrilansFormField.startdato}
            label={intlHelper(intl, `frilanser.startdato.spm`)}
            showYearSelector={true}
            maxDate={søknadsdato}
            description={
                <ExpandableInfo title="Hva hvis jeg ikke er sikker?">
                    <p>Vi trenger en eksakt dato hvis du startet som frilanser underveis i pleiepengeperioden din.</p>
                    <p>
                        Hvis du startet før pleiepengeperioden, trenger vi ikke eksakt dato. Da kan du bare legge inn en
                        dato så nært opptil startdatoen som du kan.
                    </p>
                </ExpandableInfo>
            }
            minDate={date99YearsFromNow}
            dayPickerProps={{ defaultMonth: søknadsperiode.to }}
            validate={(value) => {
                const error = getFrilanserStartdatoValidator(startdatoValue, søknadsperiode, søknadsdato)(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              frilanstype: intlHelper(intl, `validation.frilans.startdato`),
                          },
                      }
                    : undefined;
            }}
            data-testid="er-frilanser-startdato"
        />
    );
};

export default FrilansStartdatoSpørsmål;
