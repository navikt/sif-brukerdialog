import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField } from '../../../../../types/_FrilansFormData';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    misterHonorar?: YesOrNo;
}

const MisterHonorarSpørsmål: React.FunctionComponent<Props> = ({ misterHonorar }) => {
    const intl = useIntl();
    return (
        <>
            <ArbFriFormComponents.RadioGroup
                name={FrilansFormField.misterHonorar}
                data-testid="misterHonorar"
                legend={intlHelper(intl, 'frilanser.misterHonorar.tittle')}
                validate={getYesOrNoValidator()}
                radios={[
                    {
                        label: 'Ja',
                        value: YesOrNo.YES,
                        'data-testid': 'mister-honorar_yes',
                    },
                    {
                        label: 'Nei',
                        value: YesOrNo.NO,
                        'data-testid': 'mister-honorar_no',
                    },
                ]}
                value={misterHonorar}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'frilanser.misterHonorar.description.tittel')}>
                        <FormattedMessage id={'frilanser.misterHonorar.description'} />
                    </ExpandableInfo>
                }
            />

            {misterHonorar === YesOrNo.NO && (
                <FormBlock margin="l">
                    <Alert variant="info">
                        <FormattedMessage id={'frilanser.misterHonorar.nei.info'} />
                    </Alert>
                </FormBlock>
            )}
        </>
    );
};

export default MisterHonorarSpørsmål;
