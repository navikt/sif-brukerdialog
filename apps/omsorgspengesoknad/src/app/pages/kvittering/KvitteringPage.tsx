import { Heading, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/lib/atoms/checkmark-icon/CheckmarkIcon';
import Checklist from '@navikt/sif-common-core-ds/lib/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import getLenker from '../../lenker';

const KvitteringPage = () => {
    const intl = useIntl();

    useLogSidevisning(SIFCommonPageKey.kvittering);

    return (
        <Page title={intlHelper(intl, 'page.kvittering.sidetittel')}>
            <div data-testid="kvittering-page">
                <div role="presentation" aria-hidden="true" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <CheckmarkIcon />
                </div>

                <Heading level="1" size="large">
                    <FormattedMessage id="page.kvittering.tittel" />
                </Heading>
                <Block margin="xl">
                    <Heading size="medium" level="2">
                        <FormattedMessage id="page.kvittering.info.tittel" />
                    </Heading>
                    <Checklist>
                        <li>
                            <FormattedMessage id="page.kvittering.info.1" />
                        </li>
                        <li>
                            <FormattedMessage id="page.kvittering.info.2" />
                        </li>
                        <li>
                            <p>
                                <FormattedMessage id="page.kvittering.info.3.1" />
                            </p>
                            <p>
                                <Link href={getLenker(intl.locale).saksbehandlingstider} target="_blank">
                                    <FormattedMessage id="page.kvittering.info.3.2" />
                                </Link>
                            </p>
                        </li>
                    </Checklist>
                </Block>
            </div>
        </Page>
    );
};

export default KvitteringPage;
