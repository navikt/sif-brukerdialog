import { Alert, BodyLong } from '@navikt/ds-react';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import SoknadHeader from '@navikt/sif-common-core-ds/lib/components/soknad-header/SoknadHeader';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import './unavailablePage.less';

const bem = bemUtils('introPage');

const UnavailablePage = () => {
    const title = 'Ettersendelse av dokumenter';
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
