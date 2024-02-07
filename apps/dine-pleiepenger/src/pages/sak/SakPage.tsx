import { Box, VStack } from '@navikt/ds-react';
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

interface Props {
    pleietrengende: Pleietrengende;
    sak: Sak;
    saksbehandlingstidUker?: number;
}

const SakPage: React.FunctionComponent<Props> = ({ sak, pleietrengende, saksbehandlingstidUker }) => {
    const navn = personaliaUtils.navn(pleietrengende);

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
                        <Svarfrist frist={sak.saksbehandlingsFrist} saksbehandlingstidUker={saksbehandlingstidUker} />
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
