import { BodyShort, Heading, VStack } from '@navikt/ds-react';

import DefaultPageLayout from './layout/DefaultPageLayout';

interface Props {
    oppgaveReferanse?: string;
}
const OppgaveIkkeFunnetPage = ({ oppgaveReferanse }: Props) => {
    return (
        <DefaultPageLayout documentTitle="Oppgave ikke funnet">
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
        </DefaultPageLayout>
    );
};

export default OppgaveIkkeFunnetPage;
