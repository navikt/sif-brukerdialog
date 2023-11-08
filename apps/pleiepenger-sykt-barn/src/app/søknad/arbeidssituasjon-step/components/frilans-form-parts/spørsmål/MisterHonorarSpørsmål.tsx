import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
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
                legend={intlHelper(intl, 'frilanser.misterHonorar.tittle')}
                validate={getYesOrNoValidator()}
                radios={[
                    {
                        label: 'Ja',
                        value: YesOrNo.YES,
                    },
                    {
                        label: 'Nei',
                        value: YesOrNo.NO,
                    },
                ]}
                value={misterHonorar}
                description={
                    <ExpandableInfo title={intlHelper(intl, 'frilanser.misterHonorar.description.tittel')}>
                        <FormattedMessage id={'frilanser.misterHonorar.description'} />
                    </ExpandableInfo>
                }
            />
        </>
    );
};

export default MisterHonorarSpørsmål;
