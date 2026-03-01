import { Alert, Heading, VStack } from '@navikt/ds-react';

interface ErrorPageProps {
    error: string;
}

export const ErrorPage = ({ error }: ErrorPageProps) => {
    return (
        <VStack gap="space-16" style={{ minHeight: '50vh' }}>
            <Heading size="large">Noe gikk galt</Heading>
            <Alert variant="error">{error}</Alert>
        </VStack>
    );
};
