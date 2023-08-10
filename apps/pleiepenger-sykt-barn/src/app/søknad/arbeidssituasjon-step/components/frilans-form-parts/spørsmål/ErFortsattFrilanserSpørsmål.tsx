import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    erFortsattFrilanserValue?: YesOrNo;
    frilanstype: string;
}

const ErFortsattFrilanserSpørsmål: React.FunctionComponent<Props> = ({
    erFortsattFrilanserValue,
    frilanstype: Frilanstype,
}) => {
    const intl = useIntl();
    return (
        <ArbFriFormComponents.RadioGroup
            name={FrilansFormField.erFortsattFrilanser}
            data-testid="erFortsattFrilanser"
            legend={intlHelper(intl, `frilanser.erFortsattFrilanser.${Frilanstype}.spm`)}
            validate={(value) => {
                const error = getYesOrNoValidator()(value);
                return error
                    ? {
                          key: `${error}`,
                          values: {
                              frilanstype: intlHelper(intl, `validation.frilans.erFortsattFrilanser.${Frilanstype}`),
                          },
                      }
                    : undefined;
            }}
            radios={[
                {
                    label: 'Ja',
                    value: YesOrNo.YES,
                    'data-testid': 'er-fortsatt-frilanser_yes',
                },
                {
                    label: 'Nei',
                    value: YesOrNo.NO,
                    'data-testid': 'er-fortsatt-frilanser_no',
                },
            ]}
            value={erFortsattFrilanserValue}
        />
    );
};

export default ErFortsattFrilanserSpørsmål;
