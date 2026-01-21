import { Alert, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText } from '../../i18n';
import OppdatereSakLenker from '../oppdatere-sak-lenker/OppdatereSakLenker';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';
import PageHeader from '../page-layout/page-header/PageHeader';
import SaksbehandlingstidPanel from '../saksbehandlingstid/Saksbehandlingstid';
import SkrivTilOssLenker from '../skriv-til-oss-lenker/SkrivTilOssLenker';
import SnarveierSak from '../snarveier-sak/SnarveierSak';

interface Props {
    saksnr?: string;
    error?: Error;
}

const SakErrorPage = ({ saksnr }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [],
        inkluderDinePleiepengesakerLenke: true,
        saksnummer: saksnr,
    });

    return (
        <DefaultPageLayout
            pageHeader={
                <PageHeader
                    title="Din pleiepengesak for sykt barn"
                    byline={
                        <BodyShort as="div">
                            <span>
                                <AppText id="sakPageHeader.saksnr" values={{ saksnr }} />
                            </span>
                        </BodyShort>
                    }
                />
            }>
            <Head>
                <title>Din pleiepengesak for sykt barn - {saksnr}</title>
            </Head>
            <VStack gap="space-48">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <Heading size="medium" level="2" spacing={true}>
                            Hent informasjon om sak feilet
                        </Heading>
                        <Alert variant="error" className="mb-6">
                            Vi klarte dessverre ikke å hente informasjon om pleiepengesaken din. Prøv igjen senere.
                        </Alert>
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <VStack gap="space-20">
                            <SaksbehandlingstidPanel />
                        </VStack>
                    </div>
                </Box>
                <Box>
                    <OppdatereSakLenker />
                </Box>
                <Box>
                    <SkrivTilOssLenker />
                </Box>
                <Box className="mb-10">
                    <SnarveierSak saksnummer={saksnr} />
                </Box>
            </VStack>
        </DefaultPageLayout>
    );
};
export default SakErrorPage;
