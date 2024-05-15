import { BodyLong, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { AppText, useAppIntl } from '../../i18n';
import './generalErrorPage.css';

const GeneralErrorPage = () => {
    const { text } = useAppIntl();
    return (
        <Page title={text('page.generalErrorPage.sidetittel')}>
            <div className={'generalErrorPage'}>
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="large">
                        <AppText id="page.generalErrorPage.tittel" />
                    </Heading>
                    <Block margin="m" padBottom="l">
                        <BodyLong size="large">
                            <AppText id="page.generalErrorPage.tekst" />
                        </BodyLong>
                    </Block>
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
