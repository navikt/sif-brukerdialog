import { Alert, BodyLong } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';

const bem = bemUtils('introPage');

const UnavailablePage = () => {
    const intl = useIntl();
    const title = intlHelper(intl, 'banner.title');

    useLogSidevisning(SIFCommonPageKey.ikkeTilgjengelig);

    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <SoknadHeader title={title} />}>
            <Block margin="xxxl">
                <Alert variant="warning">
                    <BodyLong as="div">
                        <FormattedMessage id="page.unavailable.info.1" />
                        <p>
                            <FormattedMessage id="page.unavailable.info.2" />
                        </p>
                    </BodyLong>
                </Alert>
            </Block>
        </Page>
    );
};

export default UnavailablePage;
