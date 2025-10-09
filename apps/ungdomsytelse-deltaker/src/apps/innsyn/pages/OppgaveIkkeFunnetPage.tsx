import { Alert, BodyShort, Heading, VStack } from '@navikt/ds-react';
import { useAppIntl } from '@shared/i18n';

import DefaultPageLayout from '../../../pages/layout/DefaultPageLayout';

interface Props {
    oppgaveReferanse?: string;
}
const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout documentTitle={text('oppgaveIkkeFunnetPage.dokumentTittel')}>
            <VStack gap="4">
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
        </DefaultPageLayout>
    );
};

export default OppgaveIkkeFunnetPage;
