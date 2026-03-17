import { Box, Heading } from '@navikt/ds-react';

export const AppErrorFallback = () => (
    <Box paddingBlock="space-40">
        <Heading level="2" size="medium">
            Det oppstod en feil
        </Heading>
        <p>Du kan prøve å laste siden på nytt, eller du kan vente litt og prøve igjen senere.</p>
    </Box>
);
