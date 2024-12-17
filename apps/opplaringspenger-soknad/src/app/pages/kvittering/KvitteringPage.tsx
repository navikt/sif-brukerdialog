import { Link } from '@navikt/ds-react';
import Infolist from '@navikt/sif-common-core-ds/src/components/lists/infolist/Infolist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { KvitteringInfo } from '../../types/KvitteringInfo';

interface Props {
    kvitteringInfo?: KvitteringInfo;
}

const KvitteringPage = ({ kvitteringInfo }: Props) => {
    const { text, intl } = useAppIntl();

    return (
        <Page title={text('page.kvittering.sidetittel')}>
            <Kvittering tittel={text('page.kvittering.tittel')}>
                <Infolist heading={text('page.kvittering.info.tittel')}>
                    {kvitteringInfo?.arbeidsgivere && (
                        <li>
                            <AppText
                                id={'page.kvittering.list.item.1'}
                                values={{ antall: kvitteringInfo.arbeidsgivere.length }}
                            />
                        </li>
                    )}
                    <li>
                        <AppText id="page.kvittering.list.item.2" />
                    </li>
                    <li>
                        <AppText
                            id="page.kvittering.list.item.3"
                            values={{
                                MinSideLenke: (children) => (
                                    <Link href={getLenker(intl.locale).minSide} target="_blank">
                                        {children}
                                    </Link>
                                ),
                                SaksbehandlingstidLenke: (children) => (
                                    <Link href={getLenker(intl.locale).saksbehandlingstider} target="_blank">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </li>
                </Infolist>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
