import { Alert, Box, Heading, VStack } from '@navikt/ds-react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmelding, Sak } from '../../types';
import { browserEnv } from '../../utils/env';
import { grupperInntektsmeldingerPåArbeidsgiver } from '../../utils/inntektsmeldingUtils';
import ArbeidsgiverInntektsmeldingerListe from '../arbeidsgiver-inntektsmelding-liste/InntektsmeldingerListe';
import LinkButton from '../link-button/LinkButton';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';

interface Props {
    sak: Sak;
    inntektsmeldinger: Inntektsmelding[];
}

const InntektsmeldingerPage = ({ sak, inntektsmeldinger }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [{ url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Inntektsmeldinger' }],
        saksnummer: sak.saksnummer,
    });

    const arbeidsgivereMedInntektsmeldinger = grupperInntektsmeldingerPåArbeidsgiver(inntektsmeldinger);

    return (
        <>
            <Head>
                <title>Inntektsmeldinger - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <DefaultPageLayout pageHeader={<PageHeader title="Inntektsmeldinger" hidePleiepengerIcon={true} />}>
                <VStack gap="space-24">
                    {inntektsmeldinger && inntektsmeldinger.length > 0 ? (
                        <Box marginBlock="space-0 space-24">
                            <VStack gap="space-32">
                                {arbeidsgivereMedInntektsmeldinger.map((arbeidsgiver) => (
                                    <ArbeidsgiverInntektsmeldingerListe
                                        key={arbeidsgiver.arbeidsgiverId}
                                        saksnummer={sak.saksnummer}
                                        arbeidsgiver={arbeidsgiver}
                                    />
                                ))}
                            </VStack>
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
                        <LinkButton direction="left" as={NextLink} href={`/sak/${sak.saksnummer}`}>
                            Tilbake til sak
                        </LinkButton>
                    </div>
                </VStack>
            </DefaultPageLayout>
        </>
    );
};

export default InntektsmeldingerPage;
