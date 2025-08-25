import { VStack } from '@navikt/ds-react';
import Infolist from '@navikt/sif-common-core-ds/src/components/lists/infolist/Infolist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import './kvitteringPage.css';

const KvitteringPage = () => {
    const { text } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });

    return (
        <Page title={text('page.confirmation.sidetittel')}>
            <Kvittering tittel={text('page.confirmation.tittel')}>
                <VStack gap="8">
                    <Infolist heading={text('page.confirmation.undertittel')}>
                        <li>
                            <AppText id="page.conformation.alert.info.1" />
                        </li>
                        <li>
                            <AppText id="page.conformation.alert.info.3" />
                        </li>
                    </Infolist>
                </VStack>
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
