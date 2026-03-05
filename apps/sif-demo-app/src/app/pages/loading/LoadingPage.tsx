import { Loader, VStack } from '@navikt/ds-react';

import { DefaultPage } from '../../components/default-page/DefaultPage';

export const LoadingPage = () => {
    return (
        <DefaultPage documentTitle="Laster inn">
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Loader size="3xlarge" title="Laster inn..." />
            </VStack>
        </DefaultPage>
    );
};
