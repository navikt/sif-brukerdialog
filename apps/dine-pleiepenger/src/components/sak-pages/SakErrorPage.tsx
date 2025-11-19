import { Alert, BodyShort, Box, VStack } from '@navikt/ds-react';
import Head from 'next/head';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { AppText } from '../../i18n';
import DevBranchInfo from '../dev-branch-info/DevBranchInfo';
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
        saksnummer: saksnr, // Brukes ikke, men gjør at bruker får lenke til velg-sak siden
    });

    return (
        <DefaultPageLayout
            pageHeader={
                <PageHeader
                    title="Din pleiepengesak for sykt barn"
                    hidePleiepengerIcon={true}
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
            <VStack gap="12">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <Alert variant="error" className="mb-6">
                            Vi klarte dessverre ikke å hente informasjon om pleiepengesaken din. Prøv igjen senere.
                        </Alert>
                    </div>
                    <div className="md:mb-none shrink-0 md:w-72">
                        <VStack gap="5">
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
            <DevBranchInfo />
        </DefaultPageLayout>
    );
};
export default SakErrorPage;
