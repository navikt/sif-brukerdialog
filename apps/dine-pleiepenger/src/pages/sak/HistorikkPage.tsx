import { Box, VStack } from '@navikt/ds-react';
import React from 'react';
import Head from 'next/head';
import DefaultPageLayout from '../../components/page-layout/default-page-layout/DefaultPageLayout';
import SakPageHeader from '../../components/page-layout/sak-page-header/SakPageHeader';
import StatusISak from '../../components/status-i-sak/StatusISak';
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
}

const HistorikkPage: React.FunctionComponent<Props> = ({ sak, pleietrengende }) => {
    const navn = personaliaUtils.navn(pleietrengende);
    const router = useRouter();

    setBreadcrumbs(
        getAllBreadcrumbs([
            { url: `${browserEnv.NEXT_PUBLIC_BASE_PATH}/sak/${sak.saksnummer}`, title: 'Din pleiepengesak' },
            { url: browserEnv.NEXT_PUBLIC_BASE_PATH, title: 'Historikk' },
        ]),
    );

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
                <Box className="md:flex md:gap-6 mb-10">
                    <div className="md:grow mb-10 md:mb-0">{<StatusISak sak={sak} visAlleHendelser={true} />}</div>
                    <div className="md:mb-none shrink-0 md:w-72"></div>
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};

export default HistorikkPage;
