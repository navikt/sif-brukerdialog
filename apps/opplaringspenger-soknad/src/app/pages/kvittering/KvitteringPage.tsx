import { Link, VStack } from '@navikt/ds-react';
import Infolist from '@navikt/sif-common-core-ds/src/components/lists/infolist/Infolist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';

import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import UXArbeidstidTilFravær from '../../uxsignals/UXArbeidstidTilFravær';

const KvitteringPage = () => {
    const { text, intl } = useAppIntl();

    return (
        <Page title={text('page.kvittering.sidetittel')}>
            <VStack gap="space-24">
                <Kvittering tittel={text('page.kvittering.tittel')}>
                    <Infolist heading={text('page.kvittering.info.tittel')}>
                        <li>
                            <AppText id="page.kvittering.list.item.1" />
                        </li>
                        <li>
                            <AppText
                                id="page.kvittering.list.item.2"
                                values={{
                                    MinSideLenke: (children) => (
                                        <Link
                                            href={getLenker(intl.locale).minSide}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {children}
                                        </Link>
                                    ),
                                    SaksbehandlingstidLenke: (children) => (
                                        <Link
                                            href={getLenker(intl.locale).saksbehandlingstider}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {children}
                                        </Link>
                                    ),
                                }}
                            />
                        </li>
                    </Infolist>
                </Kvittering>
                <UXArbeidstidTilFravær />
            </VStack>
        </Page>
    );
};

export default KvitteringPage;
