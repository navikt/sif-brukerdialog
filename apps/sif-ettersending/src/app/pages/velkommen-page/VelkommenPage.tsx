import React from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SamtykkeForm, SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { useAppIntl } from '../../i18n';
import { useSoknadContext } from '../../soknad/SoknadContext';
import { Søknadstype } from '../../types/Søknadstype';
import OmSøknaden from './OmSøknaden';
import VelkommenGuide from './VelkommenGuide';

interface Props {
    søknadstype: Søknadstype;
}

const VelkommenPage: React.FC<Props> = ({ søknadstype }) => {
    const { text } = useAppIntl();
    const { startSoknad } = useSoknadContext();

    useLogSidevisning(SIFCommonPageKey.velkommen);

    return (
        <>
            <Page
                title={text(`application.title.${søknadstype}`)}
                topContentRenderer={() => <SoknadHeader title={text(`application.title.${søknadstype}`)} level="2" />}>
                <VelkommenGuide />

                <OmSøknaden />

                <SamtykkeForm
                    onValidSubmit={startSoknad}
                    submitButtonLabel={text('ettersendelse.samtykkeForm.submitButtonLabel')}
                />
            </Page>
        </>
    );
};

export default VelkommenPage;
