import React from 'react';
import { useAppIntl } from '@i18n/index';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    erFortsattFrilanserValue?: YesOrNo;
}

const ErFortsattFrilanserSpørsmål: React.FunctionComponent<Props> = ({ erFortsattFrilanserValue }) => {
    const { text } = useAppIntl();
    return (
        <ArbFriFormComponents.RadioGroup
            name={FrilansFormField.erFortsattFrilanser}
            data-testid="erFortsattFrilanser"
            legend={text(`frilanser.erFortsattFrilanser.spm`)}
            validate={(value) => {
                const error = getYesOrNoValidator()(value);
                return error
                    ? {
                          key: `${error}`,
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
