import { Heading, Ingress } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import './generalErrorPage.less';

const GeneralErrorPage = () => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.generalErrorPage.sidetittel')}>
            <div className={'generalErrorPage'}>
                <SifGuidePanel mood="uncertain">
                    <Heading level="2" size="large">
                        <FormattedMessage id="page.generalErrorPage.tittel" />
                    </Heading>
                    <Block margin="m" padBottom="l">
                        <Ingress>
                            <FormattedMessage id="page.generalErrorPage.tekst" />
                        </Ingress>
                    </Block>
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
