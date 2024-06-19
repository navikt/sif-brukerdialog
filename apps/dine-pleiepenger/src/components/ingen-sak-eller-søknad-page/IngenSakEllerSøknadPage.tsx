import { Alert, Box, LinkPanel, VStack } from '@navikt/ds-react';
import Head from 'next/head';
import { AppText } from '../../i18n';
import { browserEnv } from '../../utils/env';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';

const IngeSakEllerSøknadPage = () => (
    <DefaultPageLayout>
        <Head>
            <title>
                <AppText id="forside.dokumentTittel" />
            </title>
        </Head>
        <VStack gap="8">
            <Box className="md:flex md:gap-6">
                <div className="md:grow mb-10 md:mb-0">
                    <Box className="md:flex md:gap-6">
                        <Alert variant="info">
                            <AppText id="ingeSakPage.melding" />
                        </Alert>
                    </Box>
                </div>
                <div className="md:mb-none shrink-0 md:w-72">
                    <VStack gap="4">
                        <LinkPanel href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_INFO_URL}>
                            <AppText id="snarveier.omPleiepenger" />
                        </LinkPanel>
                        <LinkPanel href={browserEnv.NEXT_PUBLIC_SKJEMA_PLEIEPENGER_URL}>
                            <AppText id="snarveier.søkOmPleiepenger" />
                        </LinkPanel>
                    </VStack>
                </div>
            </Box>
        </VStack>
    </DefaultPageLayout>
);

export default IngeSakEllerSøknadPage;
