import React from 'react';
import { useAppIntl } from '@i18n/index';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-common-validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    erFortsattFrilanserValue?: YesOrNo;
}

const ErFortsattFrilanserSpørsmål: React.FunctionComponent<Props> = ({ erFortsattFrilanserValue }) => {
    const { text } = useAppIntl();
    return (
        <ArbFriFormComponents.YesOrNoQuestion
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
            value={erFortsattFrilanserValue}
        />
    );
};

export default ErFortsattFrilanserSpørsmål;
