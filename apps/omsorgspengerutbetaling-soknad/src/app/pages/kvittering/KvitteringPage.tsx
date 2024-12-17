import { Link } from '@navikt/ds-react';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';

const KvitteringPage = () => {
    const { text, intl } = useAppIntl();
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
                    </li>
                </Checklist>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
