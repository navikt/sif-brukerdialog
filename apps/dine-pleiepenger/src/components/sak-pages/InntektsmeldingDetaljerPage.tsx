import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Box, BoxNew, Detail, HStack, Link, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { usePleietrengendeMedSakFromRoute } from '../../hooks/usePleietrengendeMedSakFromRoute';
import { browserEnv } from '../../utils/env';
import { getImUtils } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingDetaljer from '../inntektsmelding-detaljer/InntektsmeldingDetaljer';
import { InntektsmeldingStatusTag } from '../inntektsmelding-status-tag/InntektsmeldingStatusTag';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import LoadingPage from '../page-layout/loading-page/LoadingPage';
import PageHeader from '../page-layout/page-header/PageHeader';

const InntektsmeldingDetaljerPage = () => {
    const router = useRouter();
    const { saksnr, journalpostId } = router.query;
    const { pleietrengendeMedSak, isLoading, error } = usePleietrengendeMedSakFromRoute();

    const inntektsmelding = pleietrengendeMedSak?.inntektsmeldinger?.find((im) => im.journalpostId === journalpostId);

    useBreadcrumbs({
        breadcrumbs: [
            { url: `/sak/${saksnr}/inntektsmelding`, title: 'Rapportert inntekt', handleInApp: true },
            { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Inntektsmelding' },
        ],
        saksnummer: typeof saksnr === 'string' ? saksnr : undefined,
    });

    if (isLoading) {
        return <LoadingPage title="Laster inntektsmelding..." />;
    }

    const renderContent = () => {
        if (error) {
            return (
                <Alert variant="error">
                    Noe gikk galt ved henting av inntektsmeldingen. Vennligst prøv igjen senere.
                </Alert>
            );
        }

        return inntektsmelding ? (
            <InntektsmeldingDetaljer inntektsmelding={inntektsmelding} />
        ) : (
            <Alert variant="info">Ugyldig inntektsmelding.</Alert>
        );
    };

    return (
        <DefaultPageLayout
            pageHeader={
                <PageHeader
                    title={`Inntektsmelding ${inntektsmelding ? `fra ${getImUtils(inntektsmelding).arbeidsgiverNavn}` : ''}`}
                    hidePleiepengerIcon={true}
                    byline={
                        inntektsmelding ? (
                            <VStack gap="6" marginBlock="2 0">
                                <Detail uppercase={true}>
                                    Sendt inn {dateFormatter.compactWithTime(inntektsmelding.mottattDato)}
                                </Detail>
                                <HStack gap="2" align="center">
                                    <BodyShort weight="semibold" size="large">
                                        Status:
                                    </BodyShort>
                                    <InntektsmeldingStatusTag
                                        status={inntektsmelding.status}
                                        size="medium"
                                        showIcon={true}
                                    />
                                </HStack>
                            </VStack>
                        ) : undefined
                    }
                />
            }>
            <Head>
                <title>Inntektsmelding - Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>

            <BoxNew maxWidth="52rem">
                <VStack gap="4">
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
