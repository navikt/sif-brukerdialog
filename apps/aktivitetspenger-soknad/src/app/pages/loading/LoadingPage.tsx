import { Loader, VStack } from '@navikt/ds-react';

export const LoadingPage = () => (
    <VStack align="center" justify="center" style={{ minHeight: '50vh' }}>
        <Loader size="3xlarge" title="Laster..." />
    </VStack>
);
