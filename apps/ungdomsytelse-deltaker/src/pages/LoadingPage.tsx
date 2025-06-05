import { Loader, VStack } from '@navikt/ds-react';
import DefaultPageLayout from '../apps/innsyn/pages/layout/DefaultPageLayout';

const LoadingPage = () => {
    return (
        <DefaultPageLayout documentTitle="Henter informasjon">
            <VStack align="center" justify="center" marginBlock="10">
                <Loader size="3xlarge" />
            </VStack>
        </DefaultPageLayout>
    );
};

export default LoadingPage;
