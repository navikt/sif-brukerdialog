import { Alert, Button, VStack } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common-api';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { Kvittering } from '@navikt/sif-common-soknad-ds/src';
import { AppText, useAppIntl } from '../../i18n';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidsgiverDetaljer } from '../../types/søknadApiData/SøknadApiData';
import TilArbeidsgiverDokumentListe from './components/TilArbeidsgiverDokumentListe';
import './kvitteringPage.css';

interface Props {
    søker: Søker | undefined;
    kvitteringInfo?: ArbeidsgiverDetaljer[];
}
const KvitteringPage = ({ søker, kvitteringInfo }: Props) => {
    const { text } = useAppIntl();
    const { dispatch } = useSøknadContext();

    useEffectOnce(() => {
        dispatch(actionsCreator.setSøknadSendt());
    });

    return (
        <Page title={text('page.confirmation.sidetittel')}>
            <Kvittering tittel={text('page.confirmation.tittel')}>
                <Alert variant="warning">
                    <AppText id="page.conformation.alert.infoForsvinner" />
                    <Block margin="l">
                        <AppText id="page.conformation.alert.infoPrint" />
                    </Block>
                </Alert>
                <VStack gap="8">
                    <Checklist heading={text('page.confirmation.undertittel')}>
                        <li>
                            <AppText id="page.conformation.alert.info.1" />
                        </li>
                        <li>
                            <AppText id="page.conformation.alert.info.2" />
                        </li>
                        <li>
                            <AppText id="page.conformation.alert.info.3" />
                        </li>
                        <li>
                            <AppText id="page.conformation.alert.info.4" />
                        </li>
                    </Checklist>

                    <VStack align="center" className="kvittering-print-button">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={(): boolean => {
                                window.print();
                                return false;
                            }}>
                            <AppText id="page.conformation.skrivUtKnapp" />
                        </Button>
                    </VStack>

                    <AppText id="page.conformation.skrivUt.info" />
                </VStack>

                {søker && kvitteringInfo && (
                    <TilArbeidsgiverDokumentListe søker={søker} arbeidsgivere={kvitteringInfo} />
                )}
            </Kvittering>
        </Page>
    );
};

export default KvitteringPage;
