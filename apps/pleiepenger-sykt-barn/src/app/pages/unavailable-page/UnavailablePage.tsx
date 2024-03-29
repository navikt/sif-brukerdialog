import { Alert, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import './unavailablePage.less';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';

const bem = bemUtils('introPage');

const link = 'https://www.nav.no/soknader/nb/person/familie/pleiepenger-og-opplaringspenger';

const UnavailablePage = () => {
    const intl = useIntl();
    const title = intlHelper(intl, 'application.title');
    useLogSidevisning(SIFCommonPageKey.ikkeTilgjengelig);
    return (
        <Page className={bem.block} title={title} topContentRenderer={() => <SoknadHeader title={title} />}>
            <Block margin="xxxl">
                <Alert variant="warning">
                    <p>
                        <FormattedMessage id="page.unavailable.1" />{' '}
                        <strong>
                            <Link href={link}>
                                <FormattedMessage id="page.unavailable.2" />
                            </Link>
                        </strong>
                        .
                    </p>
                    <p>
                        <FormattedMessage id="page.unavailable.3" />
                    </p>
                </Alert>
            </Block>
        </Page>
    );
};

export default UnavailablePage;
