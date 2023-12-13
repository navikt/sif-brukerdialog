import React from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import { useSoknadContext } from '../../soknad/SoknadContext';
import { Søknadstype } from '../../types/Søknadstype';
import OmSøknaden from './OmSøknaden';
import VelkommenGuide from './VelkommenGuide';

interface Props {
    søknadstype: Søknadstype;
}

const VelkommenPage: React.FC<Props> = ({ søknadstype }) => {
    const intl = useIntl();
    const { startSoknad } = useSoknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, `application.title.${søknadstype}`)}
                topContentRenderer={() => (
                    <SoknadHeader title={intlHelper(intl, `application.title.${søknadstype}`)} level="2" />
                )}>
                <VelkommenGuide />

                <OmSøknaden />

                <SamtykkeForm
                    onValidSubmit={startSoknad}
                    submitButtonLabel={intlHelper(intl, 'ettersendelse.samtykkeForm.submitButtonLabel')}
                />
            </Page>
        </>
    );
};

export default VelkommenPage;
