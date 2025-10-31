import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, Heading, Link, VStack } from '@navikt/ds-react';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import { dateFormatter } from '@navikt/sif-common-utils';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmelding } from '../../server/api-models/InntektsmeldingSchema';
import { browserEnv } from '../../utils/env';
import InntektsmeldingDetaljer from '../inntektsmelding-detaljer/InntektsmeldingDetaljer';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';

const fetcher = async (url: string): Promise<Inntektsmelding> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

const InntektsmeldingDetaljerPage = () => {
    const router = useRouter();
    const { saksnr, journalpostId } = router.query;

    const {
        data: innteksmelding,
        error,
        isLoading,
    } = useSWR<Inntektsmelding, AxiosError>(
        journalpostId ? `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${saksnr}/inntektsmelding/${journalpostId}` : null,
        fetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        },
    );

    useBreadcrumbs({
        breadcrumbs: [
            { url: `/sak/${saksnr}`, title: 'Din pleiepengesak for sykt barn', handleInApp: true },
            { url: `/sak/${saksnr}/inntektsmelding`, title: 'Inntektsmeldinger', handleInApp: true },
            { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Detaljer' },
        ],
    });

    const renderContent = () => {
        if (isLoading) {
            return (
                <Skeleton
                    height="6rem"
                    baseColor="#E6F1F8"
                    highlightColor="#CCE2F0"
                    style={{ borderRadius: '.5rem', borderColor: 'rgba(0,22,48,.19)', marginBottom: '.5rem' }}
                    className="border"
                    count={2}
                />
            );
        }
        if (error) {
            return (
                <Alert variant="error">
                    Noe gikk galt ved henting av inntektsmeldingen. Vennligst prøv igjen senere.
                </Alert>
            );
        }

        return innteksmelding ? (
            <InntektsmeldingDetaljer inntektsmelding={innteksmelding} />
        ) : (
            <Alert variant="info">Ugyldig inntektsmelding.</Alert>
        );
    };
    return (
        <DefaultPageLayout
            pageHeader={
                <PageHeader
                    title={`Inntektsmelding ${innteksmelding ? `fra ${innteksmelding.arbeidsgiver.navn}` : ''}`}
                    hidePleiepengerIcon={true}
                    byline={
                        innteksmelding ? (
                            <BodyShort>
                                Sendt inn av {dateFormatter.compactWithTime(innteksmelding.mottattDato)}
                            </BodyShort>
                        ) : undefined
                    }
                />
            }>
            <Head>
                <title>Inntektsmelding - Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>
            <VStack gap="12">
                <Box className="md:flex md:gap-6 mb-10">
                    <div className="md:grow mb-10 md:mb-0">
                        <VStack gap="4">
                            <Heading level="2" size="medium" className="mb-2">
                                Inntektsmelding {}
                            </Heading>
                            {renderContent()}
                            <Box className="ml-4 mt-4">
                                <Link as={NextLink} href={`/sak/${saksnr}/inntektsmelding`}>
                                    <ChevronLeftIcon role="presentation" />
                                    Tilbake til alle inntektsmeldinger
                                </Link>
                            </Box>
                        </VStack>
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72"></div>
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};

export default InntektsmeldingDetaljerPage;
