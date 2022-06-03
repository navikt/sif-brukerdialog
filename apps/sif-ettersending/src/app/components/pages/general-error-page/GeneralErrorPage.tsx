import { GuidePanel, Heading, Ingress } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/components/layout/block/Block';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import VeilederLokal from './VeilederLokal';
import './generalErrorPage.less';

const GeneralErrorPage = () => {
    const intl = useIntl();
    return (
        <Page title={intlHelper(intl, 'page.generalErrorPage.sidetittel')}>
            <div className={'generalErrorPage'}>
                <GuidePanel illustration={<VeilederLokal mood="uncertain" />}>
                    <Heading level="2" size="large">
                        <FormattedMessage id="page.generalErrorPage.tittel" />
                    </Heading>
                    <Block margin="m" padBottom="l">
                        <Ingress>
                            <FormattedMessage id="page.generalErrorPage.tekst" />
                        </Ingress>
                    </Block>
                </GuidePanel>
            </div>
        </Page>
    );
};

export default GeneralErrorPage;
