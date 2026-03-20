import { Alert, Heading, VStack } from '@navikt/ds-react';

interface Props {
    error?: string;
}

export const ErrorPage = ({ error }: Props) => (
    <VStack gap="space-4" className="p-6 md:p-10">
        <Heading size="large" level="1">
            Noe gikk galt
        </Heading>
        {error ? <Alert variant="error">{error}</Alert> : null}
    </VStack>
);
