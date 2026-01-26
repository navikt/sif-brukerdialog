import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, Box, Heading, Link, VStack } from '@navikt/ds-react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmelding, Sak } from '../../types';
import { browserEnv } from '../../utils/env';
import InntektsmeldingerListe from '../inntektsmeldinger-liste/InntektsmeldingerListe';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';

interface Props {
    sak: Sak;
    inntektsmeldinger: Inntektsmelding[];
}

const InntektsmeldingerPage = ({ sak, inntektsmeldinger }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [{ url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Inntektsmelding' }],
        saksnummer: sak.saksnummer,
    });

    const renderContent = () => {
        return inntektsmeldinger && inntektsmeldinger.length > 0 ? (
            <InntektsmeldingerListe saksnummer={sak.saksnummer} inntektsmeldinger={inntektsmeldinger} />
        ) : (
            <>
                <Heading level="2" size="medium" className="mb-2">
                    Ingen inntektsmeldinger er mottatt for denne saken
                </Heading>
                <Alert variant="info">Det er ingen inntektsmeldinger knyttet til denne saken.</Alert>
            </>
        );
    };
    return (
        <DefaultPageLayout pageHeader={<PageHeader title="Inntektsmeldinger" hidePleiepengerIcon={true} />}>
            <Head>
                <title>Inntektsmeldinger - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <Box maxWidth="52rem">
                <VStack gap="space-16">
                    {renderContent()}
                    <Box className="ml-4 mt-4">
                        <Link as={NextLink} href={`/sak/${sak.saksnummer}`}>
                            <ChevronLeftIcon role="presentation" />
                            Tilbake til sak
                        </Link>
                    </Box>
                </VStack>
            </Box>
        </DefaultPageLayout>
    );
};

export default InntektsmeldingerPage;
