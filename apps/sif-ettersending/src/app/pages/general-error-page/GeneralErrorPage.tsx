import './generalErrorPage.css';

import { BodyLong, Heading } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

import { AppText, useAppIntl } from '../../i18n';

const GeneralErrorPage = () => {
    const { text } = useAppIntl();
    return (
        <Page title={text('page.generalErrorPage.sidetittel')}>
            <div className="generalErrorPage">
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="large" spacing>
                        <AppText id="page.generalErrorPage.tittel" />
                    </Heading>
                    <BodyLong size="large">
                        <AppText id="page.generalErrorPage.tekst" />
                    </BodyLong>
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
