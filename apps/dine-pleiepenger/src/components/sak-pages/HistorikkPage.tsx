import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Box, Heading, Link, VStack } from '@navikt/ds-react';
import Head from 'next/head';
import { default as NextLink } from 'next/link';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { Inntektsmelding, Sak } from '../../types';
import { browserEnv } from '../../utils/env';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';
import StatusISak from '../status-i-sak/StatusISak';

interface Props {
    sak: Sak;
    inntektsmeldinger: Inntektsmelding[];
}

const HistorikkPage = ({ sak, inntektsmeldinger = [] }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [{ url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Historikk' }],
        saksnummer: sak.saksnummer,
    });

    return (
        <DefaultPageLayout pageHeader={<PageHeader title="Historikk" hidePleiepengerIcon={true} />}>
            <Head>
                <title>Historikk - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <VStack gap="12">
                <Box className="md:flex md:gap-6 mb-10">
                    <div className="md:grow mb-10 md:mb-0">
                        <Heading level="2" size="medium" className="mb-2">
                            Hendelser i saken
                        </Heading>
                        <StatusISak sak={sak} visAlleHendelser={true} inntektsmeldinger={inntektsmeldinger} />
                        <Box className="ml-4 mt-4">
                            <Link as={NextLink} href={`/sak/${sak.saksnummer}`}>
                                <ChevronLeftIcon role="presentation" />
                                Tilbake til sak
                            </Link>
                        </Box>
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72"></div>
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};

export default HistorikkPage;
