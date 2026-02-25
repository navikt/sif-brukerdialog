import { Loader, VStack } from '@navikt/ds-react';

import DefaultPageLayout from './layout/DefaultPageLayout';

const LoadingPage = () => {
    return (
        <DefaultPageLayout documentTitle="Aktivitetspenger">
            <VStack align="center" justify="center" marginBlock="space-40">
                <Loader size="3xlarge" />
            </VStack>
        </DefaultPageLayout>
    );
};

export default LoadingPage;
