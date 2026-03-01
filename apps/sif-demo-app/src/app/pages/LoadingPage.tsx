import { Loader, VStack } from '@navikt/ds-react';

export const LoadingPage = () => {
    return (
        <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
            <Loader size="3xlarge" title="Laster inn..." />
        </VStack>
    );
};
