import { Loader, VStack } from '@navikt/ds-react';
import DefaultPageLayout from '../apps/innsyn/pages/layout/DefaultPageLayout';

const UngLoadingPage = () => {
    return (
        <DefaultPageLayout documentTitle="Ungdomsprogramytelsen - henter informasjon">
            <VStack align="center" justify="center" marginBlock="10">
                <Loader size="3xlarge" />
            </VStack>
        </DefaultPageLayout>
    );
};

export default UngLoadingPage;
