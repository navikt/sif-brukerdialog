import { Alert, BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import { useAppIntl } from '@i18n/index';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Kvittering, SoknadHeader } from '@navikt/sif-common-soknad-ds';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { KvitteringInfo } from '../../types/KvitteringInfo';

interface Props {
    kvitteringInfo?: KvitteringInfo;
    onUnmount: () => void;
}

const ConfirmationPage = ({ kvitteringInfo, onUnmount }: Props) => {
    const { text, intl } = useAppIntl();

    useEffect(() => {
        return () => {
            onUnmount();
        };
    });

    const lenker = getLenker(intl.locale);

    return (
        <Page
            title={text('page.confirmation.sidetittel')}
            topContentRenderer={() => <SoknadHeader title={text('application.title')} />}>
            <Kvittering tittel={text('page.confirmation.tittel.1')}>
                {kvitteringInfo?.arbeidsgivere && (
                    <Alert variant="warning">
                        <AppText id="page.confirmation.tittel.advarsel.list.tittel" />
                        <List style={{ marginTop: '0rem', marginBottom: '0rem' }}>
                            <List.Item>
                                <AppText id="page.confirmation.tittel.advarsel.list.item.1" />
                            </List.Item>
                            <List.Item>
                                <AppText id="page.confirmation.tittel.advarsel.list.item.2" />
                            </List.Item>
                        </List>
                    </Alert>
                )}

                <VStack gap="4">
                    <Heading level="2" size="medium">
                        <AppText id="page.confirmation.dinePP.info.tittel" />
                    </Heading>
                    <BodyLong>
                        <AppText id="page.confirmation.dinePP.info.1" />
                    </BodyLong>
                    <List>
                        {kvitteringInfo?.arbeidsgivere && (
                            <List.Item>
                                <AppText id="page.confirmation.dinePP.list.item.1" />
                            </List.Item>
                        )}
                        <List.Item>
                            <AppText id="page.confirmation.dinePP.list.item.2" />
                        </List.Item>
                        <List.Item>
                            <AppText id="page.confirmation.dinePP.list.item.3" />
                        </List.Item>
                        <List.Item>
                            <AppText id="page.confirmation.dinePP.list.item.4" />
                        </List.Item>
                    </List>
                    <Link href={lenker.innsynSIF} target="_blank">
                        <AppText id="page.confirmation.dinePP.lenke" />
                    </Link>
                </VStack>
            </Kvittering>
        </Page>
    );
};

export default ConfirmationPage;
