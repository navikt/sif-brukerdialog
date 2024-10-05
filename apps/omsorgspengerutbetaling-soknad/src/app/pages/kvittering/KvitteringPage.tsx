import { Heading, Link } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';

const KvitteringPage = () => {
    const { text, intl } = useAppIntl();

    return (
        <Page title={text('page.kvittering.sidetittel')}>
            <div data-testid="kvittering-page">
                <div role="presentation" aria-hidden="true" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <CheckmarkIcon />
                </div>

                <Heading level="1" size="large">
                    <AppText id="page.kvittering.tittel" />
                </Heading>
                <Block margin="xl">
                    <Heading size="medium" level="2">
                        <AppText id="page.kvittering.info.tittel" />
                    </Heading>
                    <Checklist>
                        <li>
                            <AppText id="page.kvittering.info.1" />
                        </li>
                        <li>
                            <AppText id="page.kvittering.info.2" />
                        </li>
                        <li>
                            <p>
                                <AppText
                                    id="page.kvittering.info.3"
                                    values={{
                                        Lenke: (children: React.ReactNode) => (
                                            <Link href={getLenker(intl.locale).saksbehandlingstider} target="_blank">
                                                {children}
                                            </Link>
                                        ),
                                    }}
                                />
                            </p>
                        </li>
                    </Checklist>
                </Block>
            </div>
        </Page>
    );
};

export default KvitteringPage;
