import { Alert, BodyLong, Box, Heading, Link, LinkPanel, VStack } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../i18n';
import { browserEnv } from '../../utils/env';
import DefaultPageLayout from '../page-layout/default-page-layout/DefaultPageLayout';

const IngenSakEllerSøknadPage = () => {
    const { text } = useAppIntl();
    return (
        <DefaultPageLayout documentTitle={text('forside.dokumentTittel')}>
            <VStack gap="8" className="mb-16">
                <Box className="md:flex md:gap-6">
                    <div className="md:grow mb-10 md:mb-0">
                        <VStack gap="4">
                            <Heading level="2" size="medium">
                                <AppText id="ingeSakPage.saker.tittel" />
                            </Heading>
                            <Box className="md:flex md:gap-6">
                                <Alert variant="info">
                                    <div>
                                        <Heading level="3" size="xsmall">
                                            <AppText id="ingeSakPage.melding.tittel" />
                                        </Heading>
                                        <BodyLong as="div" spacing={true}>
                                            <AppText id="ingeSakPage.melding.tekst" />
                                        </BodyLong>
                                        <Box className="mt-4">
                                            <Heading level="3" size="xsmall">
                                                <AppText id="ingeSakPage.melding.andreYtelser.tittel" />
                                            </Heading>
                                            <BodyLong as="div">
                                                <AppText id="ingeSakPage.melding.andreYtelser.tekst.avsnitt.1" />
                                            </BodyLong>
                                            <Box className="mt-4">
                                                <BodyLong as="div">
                                                    <AppText
                                                        id="ingeSakPage.melding.andreYtelser.tekst.avsnitt.2"
                                                        values={{
                                                            lenkeMinSide: (children) => (
                                                                <Link href={browserEnv.NEXT_PUBLIC_MIN_SIDE_URL}>
                                                                    {children}
                                                                </Link>
                                                            ),
                                                            lenkeInnboksen: (children) => (
                                                                <Link href={browserEnv.NEXT_PUBLIC_INNBOKS_URL}>
                                                                    {children}
                                                                </Link>
                                                            ),
                                                        }}
                                                    />
                                                </BodyLong>
                                            </Box>
                                            <Box className="mt-4">
                                                <BodyLong as="div">
                                                    <AppText
                                                        id="ingeSakPage.melding.andreYtelser.tekst.avsnitt.3"
                                                        values={{
                                                            Lenke: (children) => (
                                                                <Link href={browserEnv.NEXT_PUBLIC_NAV_URL}>
                                                                    {children}
                                                                </Link>
                                                            ),
                                                        }}
                                                    />
                                                </BodyLong>
                                            </Box>
                                        </Box>
                                    </div>
                                </Alert>
                            </Box>
                        </VStack>
                    </div>
                    <div className="md:mb-none shrink-0 md:w-128">
                        <VStack gap="4">
                            <Heading level="2" size="medium">
                                <AppText id="ingeSakPage.snarveier.tittel" />
                            </Heading>
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
};

export default IngenSakEllerSøknadPage;
