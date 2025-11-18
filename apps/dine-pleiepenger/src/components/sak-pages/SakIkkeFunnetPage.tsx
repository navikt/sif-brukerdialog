import { Alert, Box } from '@navikt/ds-react';
import Head from 'next/head';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';

interface Props {
    saksnr?: string;
}

const SakIkkeFunnetPage = ({ saksnr }: Props) => {
    useBreadcrumbs({
        breadcrumbs: [],
        saksnummer: 'Sak ikke funnet', // Brukes ikke, men gjør at bruker får lenke til velg-sak siden
    });

    return (
        <DefaultPageLayout>
            <Head>
                <title>Sak ikke funnet</title>
            </Head>
            <Box className="mb-10">
                <Alert variant="error">Kunne ikke finne sak med saksnr &quot;{saksnr || 'saksnr mangler'}&quot;</Alert>
            </Box>
        </DefaultPageLayout>
    );
};
export default SakIkkeFunnetPage;
