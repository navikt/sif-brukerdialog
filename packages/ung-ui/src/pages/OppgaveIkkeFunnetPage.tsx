import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import { InnsynPage } from '@sif/ung-ui/components';

import { useUngUiIntl } from '../i18n';

interface Props {
    oppgaveReferanse?: string;
}
const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    const { text } = useUngUiIntl();
    return (
        <InnsynPage documentTitle={text('@ungUi.oppgaveIkkeFunnetPage.dokumentTittel')}>
            <VStack gap="space-16">
                <Heading size="large" level="1">
                    {text('@ungUi.oppgaveIkkeFunnetPage.tittel')}
                </Heading>
                <Alert variant="error">
                    {oppgaveReferanse ? (
                        <BodyShort>{text('@ungUi.oppgaveIkkeFunnetPage.medId', { oppgaveReferanse })}</BodyShort>
                    ) : (
                        <BodyShort>{text('@ungUi.oppgaveIkkeFunnetPage.utenId')}</BodyShort>
                    )}
                </Alert>
            </VStack>
        </InnsynPage>
    );
};

export default OppgaveIkkeFunnetPage;
