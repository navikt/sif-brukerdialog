import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';

import { useAppIntl } from '../i18n';
import InnsynPage from '../ung-ui/components/innsyn-page/InnsynPage';

interface Props {
    oppgaveReferanse?: string;
}
const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    const { text } = useAppIntl();
    return (
        <InnsynPage documentTitle={text('oppgaveIkkeFunnetPage.dokumentTittel')}>
            <VStack gap="space-16">
                <Heading size="large" level="1">
                    {text('oppgaveIkkeFunnetPage.tittel')}
                </Heading>
                <Alert variant="error">
                    {oppgaveReferanse ? (
                        <BodyShort>{text('oppgaveIkkeFunnetPage.medId', { oppgaveReferanse })}</BodyShort>
                    ) : (
                        <BodyShort>{text('oppgaveIkkeFunnetPage.utenId')}</BodyShort>
                    )}
                </Alert>
            </VStack>
        </InnsynPage>
    );
};

export default OppgaveIkkeFunnetPage;
