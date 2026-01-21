import { BodyShort, HStack, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import ComponentLoader from '../../component-loader/ComponentLoader';
import EmptyPage from '../empty-page/EmptyPage';

interface Props {
    title?: string;
    documentTitle?: string;
}

const LoadingPage = ({ title = 'Henter informasjon ...', documentTitle }: Props) => {
    return (
        <EmptyPage>
            {documentTitle && <Head>{documentTitle}</Head>}
            <HStack align="center" justify="center" marginBlock="space-32 space-0">
                <VStack gap="space-16">
                    <ComponentLoader />
                    <BodyShort size="large">{title}</BodyShort>
                </VStack>
            </HStack>
        </EmptyPage>
    );
};

export default LoadingPage;
