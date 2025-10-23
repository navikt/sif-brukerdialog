import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Box, Heading, Link, VStack } from '@navikt/ds-react';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Head from 'next/head';
import { default as NextLink } from 'next/link';
import { useRouter } from 'next/router';

import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../../components/page-layout/sak-page-header/SakPageHeader';
import StatusISak from '../../components/status-i-sak/StatusISak';
import { Pleietrengende } from '../../server/api-models/PleietrengendeSchema';
import { Sak } from '../../server/api-models/SakSchema';
import { getAllBreadcrumbs } from '../../utils/decoratorBreadcrumbs';
import { browserEnv } from '../../utils/env';

interface Props {
    pleietrengende: Pleietrengende;
    sak: Sak;
    harFlereSaker: boolean;
}

const HistorikkPage = ({ sak, harFlereSaker, pleietrengende }: Props) => {
    const router = useRouter();
    setBreadcrumbs(
        getAllBreadcrumbs(
            [
                {
                    url: `/sak/${sak.saksnummer}`,
                    title: 'Din pleiepengesak for sykt barn',
                    handleInApp: true,
                },
                { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Historikk' },
            ],
            harFlereSaker,
        ),
    );

    onBreadcrumbClick((breadcrumb) => {
        router.push(breadcrumb.url);
    });

    return (
        <DefaultPageLayout
            pageHeader={<SakPageHeader tittel="Historikk" pleietrengende={pleietrengende} saksnr={sak.saksnummer} />}>
            <Head>
                <title>Historikk - Din pleiepengesak for sykt barn - {sak.saksnummer}</title>
            </Head>
            <VStack gap="12">
                <Box className="md:flex md:gap-6 mb-10">
                    <div className="md:grow mb-10 md:mb-0">
                        <Heading level="2" size="medium" className="mb-2">
                            Historikk
                        </Heading>
                        <StatusISak sak={sak} visAlleHendelser={true} />
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
