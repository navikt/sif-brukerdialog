import { Link } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';

const KvitteringPage = () => {
    const { locale } = useIntl();
    const { text } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });

    return (
        <Page title={text('page.kvittering.sidetittel')}>
            <Kvittering tittel={text('page.kvittering.tittel')}>
                <Checklist heading={text('page.kvittering.info.tittel')}>
                    <li>
                        <AppText id="page.kvittering.info.1" />
                    </li>
                    <li>
                        <AppText id="page.kvittering.info.2" />
                    </li>
                    <li>
                        <AppText id="page.kvittering.info.3" />
                    </li>
                    <li>
                        <p>
                            <AppText id="page.kvittering.info.4.1" />
                        </p>
                        <p>
                            <Link href={getLenker(locale).saksbehandlingstider} target="_blank">
                                <AppText id="page.kvittering.info.4.2" />
                            </Link>
                        </p>
                    </li>
                </Checklist>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
