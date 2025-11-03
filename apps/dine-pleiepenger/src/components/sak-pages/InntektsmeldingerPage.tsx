import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, Box, BoxNew, Heading, Link, VStack } from '@navikt/ds-react';
import { storageParser } from '@navikt/sif-common-core-ds/src/utils/persistence/storageParser';
import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useSWR, { useSWRConfig } from 'swr';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Sak } from '../../server/api-models/SakSchema';
import { Inntektsmeldinger } from '../../types/Inntektsmelding';
import { browserEnv } from '../../utils/env';
import InntektsmeldingerListe from '../inntektsmeldinger-liste/InntektsmeldingerListe';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';

interface Props {
    sak: Sak;
    inntektsmeldinger?: Inntektsmeldinger;
}

const InntektsmeldingerPage = ({ sak, inntektsmeldinger: inntektsmeldingerProp }: Props) => {
    const { mutate } = useSWRConfig();
    const {
        data: inntektsmeldingerFetched,
        error,
        isLoading,
    } = useSWR<Inntektsmeldinger, AxiosError>(
        inntektsmeldingerProp
            ? null
            : `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${sak.saksnummer}/inntektsmeldinger`,
        (url) => axios.get(url, { transformResponse: storageParser }).then((res) => res.data),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            errorRetryCount: 0,
        },
    );

    const inntektsmeldinger = inntektsmeldingerProp || inntektsmeldingerFetched;

    // Pre-cache hver inntektsmelding i SWR for rask navigering til detaljside
    useEffect(() => {
        if (inntektsmeldinger) {
            inntektsmeldinger.forEach((im) => {
                const cacheKey = `${browserEnv.NEXT_PUBLIC_BASE_PATH}/api/sak/${sak.saksnummer}/inntektsmelding/${im.journalpostId}`;
                // Populer SWR cache med enkelt-inntektsmelding data
                // Dette gjør at detaljsiden kan laste umiddelbart fra cache
                mutate(cacheKey, im, { revalidate: false });
            });
        }
    }, [inntektsmeldinger, mutate, sak.saksnummer]);

    useBreadcrumbs({
        breadcrumbs: [
            {
                url: `/innsyn/sak/${sak.saksnummer}`,
                title: 'Din sak',
                handleInApp: false,
            },
            { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Inntektsmelding' },
        ],
    });

    const renderContent = () => {
        if (!inntektsmeldingerProp && isLoading) {
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
        if (!inntektsmeldingerProp && error) {
            return (
                <Alert variant="error">
                    Noe gikk galt ved henting av inntektsmeldinger. Vennligst prøv igjen senere.
                </Alert>
            );
        }

        return inntektsmeldinger && inntektsmeldinger.length > 0 ? (
            <InntektsmeldingerListe saksnummer={sak.saksnummer} inntektsmeldinger={inntektsmeldinger} />
        ) : (
            <Alert variant="info">Det er ingen inntektsmeldinger knyttet til denne saken.</Alert>
        );
    };
    return (
        <DefaultPageLayout pageHeader={<PageHeader title="Inntektsmeldinger" hidePleiepengerIcon={true} />}>
            <Head>
                <title>Inntektsmeldinger - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <VStack gap="12">
                <BoxNew maxWidth="52rem">
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
                </BoxNew>
            </VStack>
        </DefaultPageLayout>
    );
};

export default InntektsmeldingerPage;
