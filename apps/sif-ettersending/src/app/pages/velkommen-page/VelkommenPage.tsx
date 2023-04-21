import React from 'react';
import { useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SoknadHeader from '@navikt/sif-common-soknad-ds/lib/components/soknad-header/SoknadHeader';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/modules/samtykke-form/SamtykkeForm';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { ApplicationType } from '../../types/ApplicationType';
import { useSoknadContext } from '../../soknad/SoknadContext';
import VelkommenGuide from './VelkommenGuide';
import OmSøknaden from './OmSøknaden';

interface Props {
    søknadstype: ApplicationType;
}

const VelkommenPage: React.FC<Props> = ({ søknadstype }) => {
    const intl = useIntl();
    const { startSoknad } = useSoknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={intlHelper(intl, `application.title.${søknadstype}`)}
                topContentRenderer={() => <SoknadHeader title={intlHelper(intl, `banner.${søknadstype}`)} level="2" />}>
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
