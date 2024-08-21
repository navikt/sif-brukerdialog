import { Alert, BodyLong } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';

const bem = bemUtils('introPage');

const UnavailablePage = () => {
    const { text } = useAppIntl();
    const title = text('banner.title');

    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <SoknadHeader title={title} />}>
            <Block margin="xxxl">
                <Alert variant="warning">
                    <BodyLong as="div">
                        <AppText id="page.unavailable.info.1" />
                        <p>
                            <AppText id="page.unavailable.info.2" />
                        </p>
                    </BodyLong>
                </Alert>
            </Block>
        </Page>
    );
};

export default UnavailablePage;
