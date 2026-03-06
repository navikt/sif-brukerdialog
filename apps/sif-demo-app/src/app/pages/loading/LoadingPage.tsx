import { Loader, VStack } from '@navikt/ds-react';

import { SøknadPage } from '../../components/søknad-page/SøknadPage';

export const LoadingPage = () => {
    return (
        <SøknadPage documentTitle="Laster inn">
            <VStack align="center" justify="center" gap="space-16" style={{ minHeight: '50vh' }}>
                <Loader size="3xlarge" title="Laster inn..." />
            </VStack>
        </SøknadPage>
    );
};
