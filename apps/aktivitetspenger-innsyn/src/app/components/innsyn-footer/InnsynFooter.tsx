import { Bleed, BodyLong, Box, Heading, Link, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';
import { InnsynPageBoundary } from '@sif/ung-innsyn/components';

export const InnsynFooter = () => {
    return (
        <footer>
            <Bleed marginInline="full" asChild>
                <Box background="brand-blue-moderateA" paddingBlock="space-24 space-48">
                    <InnsynPageBoundary>
                        <Box className="mx-auto">
                            <Heading level="2" size="medium" spacing>
                                <AppText id="page.forside.om.tittel" />
                            </Heading>
                            <VStack gap="space-16">
                                <BodyLong>
                                    <AppText id="page.forside.om.tekst.1" />
                                </BodyLong>
                                <BodyLong>
                                    <AppText
                                        id="page.forside.om.tekst.2"
                                        values={{
                                            Lenke: (chunks: ReactNode) => (
                                                <Link href={getLenker().aktivitetspenger}>{chunks}</Link>
                                            ),
                                        }}
                                    />
                                </BodyLong>
                            </VStack>
                        </Box>
                    </InnsynPageBoundary>
                </Box>
            </Bleed>
        </footer>
    );
};
