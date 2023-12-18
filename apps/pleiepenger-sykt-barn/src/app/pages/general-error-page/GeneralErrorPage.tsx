import { Heading } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import SoknadHeader from '@navikt/sif-common-soknad-ds/src/components/soknad-header/SoknadHeader';

const GeneralErrorPage = () => {
    const intl = useIntl();
    return (
        <Page
            title={intlHelper(intl, 'page.generalErrorPage.sidetittel')}
            topContentRenderer={() => <SoknadHeader title={intlHelper(intl, 'application.title')} />}>
            <div style={{ paddingTop: '1rem' }}>
                <SifGuidePanel poster={true} compact={true} mood="uncertain">
                    <Heading level="2" size="medium">
                        <FormattedMessage id="page.generalErrorPage.tittel" />
                    </Heading>
                    <Block margin="m" padBottom="l">
                        <FormattedMessage id="page.generalErrorPage.tekst" />
                    </Block>
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
