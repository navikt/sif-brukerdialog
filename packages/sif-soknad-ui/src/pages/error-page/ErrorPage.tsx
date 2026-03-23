import { Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui/pages';

interface Props {
    applicationTitle: string;
}

export const ErrorPage = ({ applicationTitle }: Props) => {
    return (
        <ApplicationPage documentTitle="Noe gikk galt" applicationTitle={applicationTitle}>
            <VStack gap="space-24">
                <Heading size="xlarge" level="1">
                    Oops, noe gikk galt
                </Heading>
                <Alert variant="error">
                    <BodyLong>Det oppstod en feil. Vennligst prøv igjen senere.</BodyLong>
                </Alert>
            </VStack>
        </ApplicationPage>
    );
};
