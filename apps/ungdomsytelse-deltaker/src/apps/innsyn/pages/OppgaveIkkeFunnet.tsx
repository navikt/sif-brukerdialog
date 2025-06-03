import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import DefaultPage from '../components/page-layout/DefaultPage';

interface Props {
    oppgaveReferanse?: string;
}

const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    return (
        <DefaultPage title="Oppgave ikke funnet">
            <VStack gap="8">
                <VStack gap="4">
                    <Heading size="large" level="1">
                        Oppgave ikke funnet
                    </Heading>
                    {oppgaveReferanse ? (
                        <BodyShort>Vi kunne ikke finne oppgave med id {oppgaveReferanse}.</BodyShort>
                    ) : (
                        <BodyShort>Vi kunne ikke finne oppgave - id mangler.</BodyShort>
                    )}
                </VStack>
            </VStack>
        </DefaultPage>
    );
};

export default OppgaveIkkeFunnetPage;
