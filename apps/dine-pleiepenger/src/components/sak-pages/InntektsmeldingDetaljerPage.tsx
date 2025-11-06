import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, BoxNew, Heading, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useInntektsmeldinger } from '../../hooks/useInntektsmeldinger';
import { browserEnv } from '../../utils/env';
import { getImUtils } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingDetaljer from '../inntektsmelding-detaljer/InntektsmeldingDetaljer';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';

const InntektsmeldingDetaljerPage = () => {
    const router = useRouter();
    const { saksnr, journalpostId } = router.query;

    const { inntektsmeldinger, isLoading, error } = useInntektsmeldinger({
        saksnummer: saksnr as string,
    });

    const innteksmelding = inntektsmeldinger?.find((im) => im.journalpostId === journalpostId);

    useBreadcrumbs({
        breadcrumbs: [
            { url: `/sak/${saksnr}`, title: 'Din sak', handleInApp: true },
            { url: `/sak/${saksnr}/inntektsmelding`, title: 'Inntektsmeldinger', handleInApp: true },
            { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Inntektsmelding' },
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
                    count={1}
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
                    title={`Inntektsmelding ${innteksmelding ? `fra ${getImUtils(innteksmelding).arbeidsgiverNavn}` : ''}`}
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

            <BoxNew maxWidth="52rem">
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
            </BoxNew>
        </DefaultPageLayout>
    );
};

export default InntektsmeldingDetaljerPage;
