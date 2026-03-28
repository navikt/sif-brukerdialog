import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';

import { useUngUiIntl } from '../i18n';
import { UngInnsynPage } from '../pages';

interface Props {
    applikasjonTittel: string;
    oppgaveReferanse?: string;
}

export const UngOppgaveIkkeFunnetPage = ({ applikasjonTittel, oppgaveReferanse }: Props) => {
    const { text } = useUngUiIntl();
    return (
        <UngInnsynPage
            documentTitle={`${text('@ungInnsyn.oppgaveIkkeFunnetPage.dokumentTittel')} - ${applikasjonTittel}`}>
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
        </UngInnsynPage>
    );
};
