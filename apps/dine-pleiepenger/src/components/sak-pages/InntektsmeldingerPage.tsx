import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, Heading, VStack } from '@navikt/ds-react';
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

    return (
        <>
            <Head>
                <title>Inntektsmeldinger - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <DefaultPageLayout pageHeader={<PageHeader title="Inntektsmeldinger" hidePleiepengerIcon={true} />}>
                <VStack gap="space-24">
                    {inntektsmeldinger && inntektsmeldinger.length > 0 ? (
                        <Box marginBlock="space-0 space-24">
                            <InntektsmeldingerListe saksnummer={sak.saksnummer} inntektsmeldinger={inntektsmeldinger} />
                        </Box>
                    ) : (
                        <>
                            <Heading level="2" size="medium" spacing>
                                Ingen inntektsmeldinger er mottatt for denne saken
                            </Heading>
                            <Alert variant="info">Det er ingen inntektsmeldinger knyttet til denne saken.</Alert>
                        </>
                    )}
                    <div>
                        <Button
                            variant="secondary"
                            type="button"
                            as={NextLink}
                            icon={<ArrowLeftIcon role="presentation" aria-hidden="true" />}
                            iconPosition="left"
                            size="small"
                            href={`/sak/${sak.saksnummer}`}>
                            Tilbake til sak
                        </Button>
                    </div>
                </VStack>
            </DefaultPageLayout>{' '}
        </>
    );
};

export default InntektsmeldingerPage;
