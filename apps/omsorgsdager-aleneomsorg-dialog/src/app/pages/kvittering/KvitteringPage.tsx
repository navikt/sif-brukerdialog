import { Link } from '@navikt/ds-react';
import React from 'react';
import { Checklist } from '@navikt/sif-common-core-ds';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';

const KvitteringPage = () => {
    const { text } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });
    return (
        <Page title={text('application.title')}>
            <Kvittering tittel={text('kvittering.tittel')}>
                <Checklist heading={text('kvittering.info.tittel')}>
                    <li>
                        <AppText id="kvittering.info.1" />
                    </li>
                    <li>
                        <AppText id="kvittering.info.2" />
                    </li>
                    <li>
                        <AppText
                            id="kvittering.info.3"
                            values={{
                                Lenke: (children: React.ReactNode) => (
                                    <Link href={getLenker().saksbehandlingstider} target="_blank">
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
