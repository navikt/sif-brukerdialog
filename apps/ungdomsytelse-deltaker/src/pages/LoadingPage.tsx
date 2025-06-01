import { Loader, VStack } from '@navikt/ds-react';
import DefaultPage from '../apps/innsyn/components/page-layout/DefaultPage';

const LoadingPage = () => {
    return (
        <DefaultPage title="Henter informasjon">
            <VStack align="center" justify="center" marginBlock="10">
                <Loader size="3xlarge" />
            </VStack>
        </DefaultPage>
    );
};

export default LoadingPage;
