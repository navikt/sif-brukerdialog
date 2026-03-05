import { Loader, VStack } from '@navikt/ds-react';

import { AppPage } from '../../components/app-page/AppPage';

export const LoadingPage = () => {
    return (
        <AppPage>
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Loader size="3xlarge" title="Laster inn..." />
            </VStack>
        </AppPage>
    );
};
