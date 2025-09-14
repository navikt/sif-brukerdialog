import { useAppIntl } from '@i18n/index';
import { Heading } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';

import { AppText } from '../../i18n';

const GeneralErrorPage = () => {
    const { text } = useAppIntl();
    return (
        <Page
            title={text('page.generalErrorPage.sidetittel')}
            topContentRenderer={() => <SoknadHeader title={text('application.title')} />}>
            <div style={{ paddingTop: '1rem' }}>
                <SifGuidePanel poster={true} compact={true} mood="uncertain">
                    <Heading level="2" size="medium" spacing={true}>
                        <AppText id="page.generalErrorPage.tittel" />
                    </Heading>
                    <AppText id="page.generalErrorPage.tekst" />
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
