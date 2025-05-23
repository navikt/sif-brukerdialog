import { Loader, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds/src';

const LoadingPage = () => {
    return (
        <Page title="Henter informasjon" topContentRenderer={() => <SoknadHeader title="Ungdomsprogramytelse" />}>
            <VStack align="center" justify="center" marginBlock="10">
                <Loader size="3xlarge" />
            </VStack>
        </Page>
    );
};

export default LoadingPage;
