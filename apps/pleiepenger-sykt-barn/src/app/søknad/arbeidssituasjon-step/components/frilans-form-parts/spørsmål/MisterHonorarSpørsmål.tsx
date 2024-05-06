import React from 'react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';
import { AppText } from '../../../../../i18n';

interface Props {
    misterHonorar?: YesOrNo;
}

const MisterHonorarSpørsmål: React.FunctionComponent<Props> = ({ misterHonorar }) => {
    const { intl } = useAppIntl();
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
                        <AppText id={'frilanser.misterHonorar.description'} />
                    </ExpandableInfo>
                }
            />
        </>
    );
};

export default MisterHonorarSpørsmål;
