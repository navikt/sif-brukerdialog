import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';

import { InnsynPage } from '../components';
import { useUngUiIntl } from '../i18n';

interface Props {
    applikasjonTittel: string;
    oppgaveReferanse?: string;
}

export const UngOppgaveIkkeFunnetPage = ({ applikasjonTittel, oppgaveReferanse }: Props) => {
    const { text } = useUngUiIntl();
    return (
        <InnsynPage documentTitle={`${text('@ungInnsyn.oppgaveIkkeFunnetPage.dokumentTittel')} - ${applikasjonTittel}`}>
            <VStack gap="space-16">
                <Heading size="large" level="1">
                    {text('@ungInnsyn.oppgaveIkkeFunnetPage.tittel')}
                </Heading>
                <Alert variant="error">
                    {oppgaveReferanse ? (
                        <BodyShort>{text('@ungInnsyn.oppgaveIkkeFunnetPage.medId', { oppgaveReferanse })}</BodyShort>
                    ) : (
                        <BodyShort>{text('@ungInnsyn.oppgaveIkkeFunnetPage.utenId')}</BodyShort>
                    )}
                </Alert>
            </VStack>
        </InnsynPage>
    );
};
