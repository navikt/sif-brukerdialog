import { Alert, Bleed, BodyShort, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { usePleietrengendeMedSakFromRoute } from '../../hooks/usePleietrengendeMedSakFromRoute';
import { browserEnv } from '../../utils/env';
import { getImUtils } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingDetaljer from '../inntektsmelding-detaljer/InntektsmeldingDetaljer';
import LinkButton from '../link-button/LinkButton';
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

    const pageTitle = inntektsmelding
        ? `Inntektsmelding fra ${getImUtils(inntektsmelding).arbeidsgiverNavn}`
        : 'Inntektsmelding';

    const pageByline = inntektsmelding ? (
        <BodyShort size="medium">Sendt inn {dateFormatter.compactWithTime(inntektsmelding.mottattDato)}</BodyShort>
    ) : undefined;

    const content = (() => {
        if (error) {
            return (
                <Alert variant="error">
                    Noe gikk galt ved henting av inntektsmeldingen. Vennligst prøv igjen senere.
                </Alert>
            );
        }
        if (!inntektsmelding) {
            return <Alert variant="info">Ugyldig inntektsmelding.</Alert>;
        }
        return <InntektsmeldingDetaljer inntektsmelding={inntektsmelding} />;
    })();

    return (
        <>
            <Head>
                <title>Inntektsmelding - Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>
            <DefaultPageLayout
                pageHeader={<PageHeader title={pageTitle} hidePleiepengerIcon={true} byline={pageByline} />}>
                <VStack gap="space-32">
                    <Bleed marginBlock="space-16 space-0">{content}</Bleed>
                    <div>
                        <LinkButton direction="left" as={NextLink} href={`/sak/${saksnr}/inntektsmelding`}>
                            Vis alle inntektsmeldinger
                        </LinkButton>
                    </div>
                </VStack>
            </DefaultPageLayout>
        </>
    );
};

export default InntektsmeldingDetaljerPage;
