import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/components/layout/block/Block';
import Page from '@navikt/sif-common-core/lib/components/page/Page';
import StepBanner from '@navikt/sif-common-core/lib/components/step-banner/StepBanner';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import './unavailablePage.less';
import { Alert, BodyLong } from '@navikt/ds-react';

const bem = bemUtils('introPage');

const UnavailablePage = () => {
    const title = 'Ettersendelse av dokumenter';
    useLogSidevisning(SIFCommonPageKey.ikkeTilgjengelig);
    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <StepBanner text={title} />}>
            <Block margin="xxxl">
                <Alert variant="warning">
                    <BodyLong as="div">
                        <p>
                            <FormattedMessage id="page.unavailable.info.1" />
                        </p>
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
