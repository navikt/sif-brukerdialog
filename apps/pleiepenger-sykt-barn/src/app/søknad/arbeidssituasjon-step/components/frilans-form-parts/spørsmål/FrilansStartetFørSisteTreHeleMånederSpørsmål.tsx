import React from 'react';
import { useAppIntl } from '@i18n/index';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../../../utils/frilanserUtils';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    søknadsperiode: DateRange;
}

const FrilansStartetFørSisteTreHeleMånederSpørsmål: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const { intl } = useAppIntl();
    const dato = dateFormatter.dateShortMonthYear(getStartdatoForNySomFrilanser(søknadsperiode));

    return (
        <ArbFriFormComponents.YesOrNoQuestion
            name={FrilansFormField.startetFørSisteTreHeleMåneder}
            legend={intlHelper(intl, `frilanser.startetFørSisteTreHeleMåneder.spm`, {
                dato,
            })}
            validate={(value) => {
                const error = getYesOrNoValidator()(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              dato,
                          },
                      }
                    : undefined;
            }}
        />
    );
};

export default FrilansStartetFørSisteTreHeleMånederSpørsmål;
