import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
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
        </>
    );
};

export default MisterHonorarSpørsmål;
