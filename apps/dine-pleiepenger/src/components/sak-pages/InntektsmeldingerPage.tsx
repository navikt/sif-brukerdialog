import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, Box, Heading, Link, VStack } from '@navikt/ds-react';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useSWR, { useSWRConfig } from 'swr';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmeldinger } from '../../server/api-models/InntektsmeldingSchema';
import { Pleietrengende } from '../../server/api-models/PleietrengendeSchema';
import { Sak } from '../../server/api-models/SakSchema';
import { browserEnv } from '../../utils/env';
import InntektsmeldingerListe from '../inntektsmeldinger-liste/InntektsmeldingerListe';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../page-layout/sak-page-header/SakPageHeader';

interface Props {
    pleietrengende: Pleietrengende;
    sak: Sak;
    harFlereSaker: boolean;
}

const inntektsmeldingerFetcher = async (url: string): Promise<Inntektsmeldinger> =>
    axios.get(url, { transformResponse: storageParser }).then((res) => res.data);

const InntektsmeldingerPage = ({ sak, harFlereSaker, pleietrengende }: Props) => {
    const { mutate } = useSWRConfig();
    const { data, error, isLoading } = useSWR<Inntektsmeldinger, AxiosError>(
        `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${sak.saksnummer}/inntektsmeldinger`,
        inntektsmeldingerFetcher,
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            errorRetryCount: 0,
        },
    );

    // Pre-cache hver inntektsmelding i SWR for rask navigering til detaljside
    useEffect(() => {
        if (data?.inntektsmeldinger) {
            data.inntektsmeldinger.forEach((im) => {
                const cacheKey = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${sak.saksnummer}/inntektsmelding/${im.journalpostId}`;
                // Populer SWR cache med enkelt-inntektsmelding data
                // Dette gjør at detaljsiden kan laste umiddelbart fra cache
                mutate(cacheKey, im, { revalidate: false });
            });
        }
    }, [data, mutate, sak.saksnummer]);

    useBreadcrumbs({
        breadcrumbs: [
            {
                url: `/innsyn/sak/${sak.saksnummer}`,
                title: 'Din pleiepengesak for sykt barn',
                handleInApp: false,
            },
            { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Inntektsmelding' },
        ],
        harFlereSaker,
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
                    count={3}
                />
            );
        }
        if (error) {
            return (
                <Alert variant="error">
                    Noe gikk galt ved henting av inntektsmeldinger. Vennligst prøv igjen senere.
                </Alert>
            );
        }
        const inntektsmeldinger = data;
        return inntektsmeldinger && inntektsmeldinger.inntektsmeldinger.length > 0 ? (
            <InntektsmeldingerListe
                saksnummer={sak.saksnummer}
                inntektsmeldinger={inntektsmeldinger?.inntektsmeldinger}
            />
        ) : (
            <Alert variant="info">Det er ingen inntektsmeldinger knyttet til denne saken.</Alert>
        );
    };
    return (
        <DefaultPageLayout
            pageHeader={
                <SakPageHeader
                    tittel="Inntektsmeldinger"
                    pleietrengende={pleietrengende}
                    saksnr={sak.saksnummer}
                    hidePleiepengerIcon={true}
                />
            }>
            <Head>
                <title>Inntektsmeldinger - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <VStack gap="12">
                <Box className="md:flex md:gap-6 mb-10">
                    <div className="md:grow mb-10 md:mb-0">
                        <VStack gap="4">
                            <Heading level="2" size="medium" className="mb-2">
                                Inntektsmeldinger vi har mottatt
                            </Heading>
                            {renderContent()}
                            <Box className="ml-4 mt-4">
                                <Link as={NextLink} href={`/sak/${sak.saksnummer}`}>
                                    <ChevronLeftIcon role="presentation" />
                                    Tilbake til sak
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

export default InntektsmeldingerPage;
