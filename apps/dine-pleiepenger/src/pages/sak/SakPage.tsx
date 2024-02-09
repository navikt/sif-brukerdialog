import { Box, Heading, LinkPanel, VStack } from '@navikt/ds-react';
import React from 'react';
import Head from 'next/head';
import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../../components/page-layout/sak-page-header/SakPageHeader';
import Snarveier from '../../components/snarveier/Snarveier';
import StatusISak from '../../components/status-i-sak/StatusISak';
import Svarfrist from '../../components/svarfrist/Svarfrist';
import { Pleietrengende } from '../../server/api-models/PleietrengendeSchema';
import { Sak } from '../../types/Sak';
import { personaliaUtils } from '../../utils/personaliaUtils';
import { setBreadcrumbs, onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { getAllBreadcrumbs } from '../../utils/decoratorBreadcrumbs';
import { browserEnv } from '../../utils/env';
import { useRouter } from 'next/router';

interface Props {
    pleietrengende: Pleietrengende;
    sak: Sak;
    saksbehandlingstidUker?: number;
}

const SakPage: React.FunctionComponent<Props> = ({ sak, pleietrengende, saksbehandlingstidUker }) => {
    const navn = personaliaUtils.navn(pleietrengende);
    const router = useRouter();

    setBreadcrumbs(getAllBreadcrumbs([{ url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Din pleiepengesak' }]));

    onBreadcrumbClick((breadcrumb) => {
        router.push(breadcrumb.url);
    });

    return (
        <DefaultPageLayout pageHeader={<SakPageHeader navn={navn} saksnr={sak.saksnummer} />}>
            <Head>
                <title>
                    Din pleiepengesak - {sak.saksnummer} {navn}
                </title>
            </Head>
            <VStack gap="12">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">{<StatusISak sak={sak} />}</div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <VStack gap="5">
                            <Svarfrist
                                frist={sak.saksbehandlingsFrist}
                                saksbehandlingstidUker={saksbehandlingstidUker}
                            />
                            <Box>
                                <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                                    Snarveier
                                </Heading>
                                <VStack gap="2">
                                    <LinkPanel href="/" border={false}>
                                        <Heading as="div" level="3" size="small">
                                            Dokumentarkiv
                                        </Heading>
                                    </LinkPanel>
                                    <LinkPanel href="/" border={false}>
                                        <Heading as="div" level="3" size="small">
                                            Utbetalinger
                                        </Heading>
                                    </LinkPanel>
                                    <LinkPanel href="/" border={false}>
                                        <Heading as="div" level="3" size="small">
                                            Om pleiepenger
                                        </Heading>
                                    </LinkPanel>
                                </VStack>
                            </Box>
                        </VStack>
                    </div>
                </Box>
                <Box>
                    <Box className="mb-10">
                        <Snarveier title="Trenger du å oppdatere saken din?" />
                    </Box>
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};

export default SakPage;
