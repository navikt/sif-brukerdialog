import { Link } from '@navikt/ds-react';
import Infolist from '@navikt/sif-common-core-ds/src/components/lists/infolist/Infolist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { KvitteringInfo } from '../../types/KvitteringInfo';

interface Props {
    kvitteringInfo?: KvitteringInfo;
}

const KvitteringPage = ({ kvitteringInfo }: Props) => {
    const { text, intl } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });

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
                                Lenke: (children) => (
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
