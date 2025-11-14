import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import ComponentLoader from '../../component-loader/ComponentLoader';
import EmptyPage from '../empty-page/EmptyPage';

interface Props {
    title?: string;
    documentTitle?: string;
}

const PageLoading = ({ title = 'Henter informasjon ...', documentTitle }: Props) => {
    return (
        <EmptyPage>
            {documentTitle && <Head>{documentTitle}</Head>}
            <HStack align="center" justify="center" marginBlock="8 0">
                <VStack gap="4">
                    <ComponentLoader />
                    <BodyShort size="large">{title}</BodyShort>
                </VStack>
            </HStack>
        </EmptyPage>
    );
};

export default PageLoading;
