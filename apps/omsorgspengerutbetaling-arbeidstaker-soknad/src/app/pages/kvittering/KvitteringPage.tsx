import { Alert, Button, Heading, Panel } from '@navikt/ds-react';
import { Søker } from '@navikt/sif-common';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import Checklist from '@navikt/sif-common-core-ds/src/components/lists/checklist/Checklist';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { AppText, useAppIntl } from '../../i18n';
import { ArbeidsgiverDetaljer } from '../../types/søknadApiData/SøknadApiData';
import TilArbeidsgiverDokumentListe from './components/TilArbeidsgiverDokumentListe';
import './kvitteringPage.css';

interface Props {
    søker: Søker | undefined;
    kvitteringInfo?: ArbeidsgiverDetaljer[];
}
const KvitteringPage = ({ søker, kvitteringInfo }: Props) => {
    const { text } = useAppIntl();

    return (
        <Page title={text('page.confirmation.sidetittel')}>
            <div data-testid="kvittering-page">
                <div role="presentation" aria-hidden="true" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <CheckmarkIcon />
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Heading level="1" size="large">
                        <AppText id="page.confirmation.tittel" />
                    </Heading>
                </div>

                <Block margin="xl">
                    <div className={'infopanelInfoForsvinner'}>
                        <Block padBottom="m">
                            <Heading level="2" size="medium">
                                <AppText id="page.confirmation.undertittel" />
                            </Heading>
                        </Block>

                        <Panel border={true} className={'luftOver'}>
                            <Alert variant="warning" inline={true}>
                                <AppText id="page.conformation.alert.infoForsvinner" />

                                <Block margin="l">
                                    <AppText id="page.conformation.alert.infoPrint" />
                                </Block>
                            </Alert>
                        </Panel>
                    </div>
                    <Checklist>
                        <li>
                            <strong>
                                <AppText id="page.conformation.alert.info.1.1" />
                            </strong>
                            <p>
                                <AppText id="page.conformation.alert.info.1.2" />
                            </p>
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
                </Block>

                <div className="kvittering-print-button" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Block margin="xl" padBottom={'xl'}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={(): boolean => {
                                window.print();
                                return false;
                            }}>
                            <AppText id="page.conformation.skrivUtKnapp" />
                        </Button>
                    </Block>
                </div>
                <Block padBottom={'xl'}>
                    <div className={'kviteringsBlokk'}>
                        <AppText id="page.conformation.skrivUt.info" />
                    </div>
                </Block>
                {søker && kvitteringInfo && (
                    <TilArbeidsgiverDokumentListe søker={søker} arbeidsgivere={kvitteringInfo} />
                )}
            </div>
        </Page>
    );
};

export default KvitteringPage;
