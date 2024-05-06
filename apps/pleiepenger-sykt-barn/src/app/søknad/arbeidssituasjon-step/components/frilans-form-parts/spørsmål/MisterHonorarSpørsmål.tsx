import React from 'react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppText } from '../../../../../i18n';
import { FrilansFormField } from '../../../../../types/søknad-form-values/FrilansFormValues';
import { ArbFriFormComponents } from '../FrilanserFormPart';

interface Props {
    misterHonorar?: YesOrNo;
}

const MisterHonorarSpørsmål: React.FunctionComponent<Props> = ({ misterHonorar }) => {
    const { text } = useAppIntl();
    return (
        <>
            <ArbFriFormComponents.RadioGroup
                name={FrilansFormField.misterHonorar}
                data-testid="misterHonorar"
                legend={text('frilanser.misterHonorar.tittle')}
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
                    <ExpandableInfo title={text('frilanser.misterHonorar.description.tittel')}>
                        <AppText id={'frilanser.misterHonorar.description'} />
                    </ExpandableInfo>
                }
            />
        </>
    );
};

export default MisterHonorarSpørsmål;
