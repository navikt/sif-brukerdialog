import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils/lib';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { getStartdatoForNySomFrilanser } from '../../../../../utils/frilanserUtils';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    søknadsperiode: DateRange;
}

const FrilansStartetFørSisteTreHeleMånederSpørsmål: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const intl = useIntl();

    return (
        <ArbFriFormComponents.YesOrNoQuestion
            name={FrilansFormField.startetFørSisteTreHeleMåneder}
            legend={intlHelper(intl, `frilanser.startetFørSisteTreHeleMåneder.spm`, {
                dato: dateFormatter.dateShortMonthYear(getStartdatoForNySomFrilanser(søknadsperiode)),
            })}
            validate={(value) => {
                const error = getYesOrNoValidator()(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              frilanstype: intlHelper(intl, `validation.frilans.startetFørSisteTreHeleMåneder`),
                          },
                      }
                    : undefined;
            }}
        />
    );
};

export default FrilansStartetFørSisteTreHeleMånederSpørsmål;
