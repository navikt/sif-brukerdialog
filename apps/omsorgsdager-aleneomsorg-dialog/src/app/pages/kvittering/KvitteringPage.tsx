import { Link } from '@navikt/ds-react';
import React from 'react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';

const KvitteringPage = () => {
    const { text } = useAppIntl();
    return (
        <Page title={text('application.title')}>
            <Kvittering
                tittel={text('kvittering.tittel')}
                liste={{
                    tittel: text('kvittering.info.tittel'),
                    punkter: [
                        text('kvittering.info.1'),
                        text('kvittering.info.2'),
                        <span key="pkt3">
                            <AppText
                                id="kvittering.info.3"
                                values={{
                                    Lenke: (children: React.ReactNode) => (
                                        <Link href={getLenker().saksbehandlingstider} target="_blank">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />{' '}
                        </span>,
                    ],
                }}
            />
        </Page>
    );
};

export default KvitteringPage;
