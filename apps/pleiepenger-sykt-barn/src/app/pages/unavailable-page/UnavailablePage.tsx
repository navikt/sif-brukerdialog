import { Alert, Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import './unavailablePage.less';
import { AppText } from '../../i18n';

const bem = bemUtils('introPage');

const link = 'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger';

const UnavailablePage = () => {
    const { text } = useAppIntl();
    const title = text('application.title');
    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <SoknadHeader title={title} />}>
            <Block margin="xxxl">
                <Alert variant="warning">
                    <p>
                        <AppText id="page.unavailable.1" />{' '}
                        <strong>
                            <Link href={link}>
                                <AppText id="page.unavailable.2" />
                            </Link>
                        </strong>
                        .
                    </p>
                    <p>
                        <AppText id="page.unavailable.3" />
                    </p>
                </Alert>
            </Block>
        </Page>
    );
};

export default UnavailablePage;
