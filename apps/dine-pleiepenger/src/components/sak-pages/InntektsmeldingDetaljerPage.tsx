import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Alert, Bleed, BodyShort, Button, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { usePleietrengendeMedSakFromRoute } from '../../hooks/usePleietrengendeMedSakFromRoute';
import { browserEnv } from '../../utils/env';
import { getImUtils } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingDetaljer from '../inntektsmelding-detaljer/InntektsmeldingDetaljer';
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
            { url: `/sak/${saksnr}/inntektsmelding`, title: 'Inntektsmeldinger', handleInApp: true },
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
        <>
            <Head>
                <title>Inntektsmelding - Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>
            <DefaultPageLayout
                pageHeader={
                    <PageHeader
                        title={`Inntektsmelding ${inntektsmelding ? `fra ${getImUtils(inntektsmelding).arbeidsgiverNavn}` : ''}`}
                        hidePleiepengerIcon={true}
                        byline={
                            inntektsmelding ? (
                                <BodyShort size="medium">
                                    Sendt inn {dateFormatter.compactWithTime(inntektsmelding.mottattDato)}
                                </BodyShort>
                            ) : undefined
                        }
                    />
                }>
                <VStack gap="space-32">
                    <Bleed marginBlock="space-16 space-0">{renderContent()}</Bleed>
                    <div>
                        <Button
                            variant="secondary"
                            type="button"
                            as={NextLink}
                            icon={<ArrowLeftIcon role="presentation" aria-hidden="true" />}
                            iconPosition="left"
                            size="small"
                            href={`/sak/${saksnr}/inntektsmelding`}>
                            Tilbake til alle inntektsmeldinger
                        </Button>
                    </div>
                </VStack>
            </DefaultPageLayout>
        </>
    );
};

export default InntektsmeldingDetaljerPage;
