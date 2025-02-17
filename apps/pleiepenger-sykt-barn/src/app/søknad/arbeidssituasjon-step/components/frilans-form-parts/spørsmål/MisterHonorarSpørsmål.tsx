import React from 'react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { getYesOrNoValidator } from '@navikt/sif-validation';
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
            <ArbFriFormComponents.YesOrNoQuestion
                name={FrilansFormField.misterHonorar}
                data-testid="misterHonorar"
                legend={text('frilanser.misterHonorar.tittle')}
                validate={getYesOrNoValidator()}
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
