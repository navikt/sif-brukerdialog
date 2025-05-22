import { Bleed, BodyShort, Box, Heading, HGrid, HStack, LinkPanel, Show, VStack } from '@navikt/ds-react';
import getLenker from '../../../../utils/lenker';
import SnarveierDameSVG from '../page-layout/illustrasjon/SnarveierDameSVG';

const Snarveier = () => {
    return (
        <HGrid columns="1fr auto" gap={{ md: '20', sm: '0' }}>
            <VStack gap="2" marginBlock="0 10">
                <Heading level="2" size="medium">
                    Har du noen spørsmål?
                </Heading>
                <BodyShort>Her er noen snarveier som kan være nyttige.</BodyShort>

                <Show below="md">
                    <HStack justify="center" marginBlock="4 0">
                        <Box maxWidth="16rem">
                            <SnarveierDameSVG size="fullWidth" />
                        </Box>
                    </HStack>
                </Show>

                <VStack gap="4" marginBlock="3 0">
                    <LinkPanel
                        border={false}
                        style={{ borderRadius: '0.5rem' }}
                        href={getLenker().omUngdomsprogramytelsen}>
                        Om ungdoms&shy;programmet
                    </LinkPanel>
                    <LinkPanel border={false} style={{ borderRadius: '0.5rem' }} href={getLenker().skrivtilOss}>
                        Skriv til oss
                    </LinkPanel>
                </VStack>
            </VStack>
            <Show above="md">
                <HStack justify="end">
                    <Bleed marginInline="0 20">
                        <SnarveierDameSVG />
                    </Bleed>
                </HStack>
            </Show>
        </HGrid>
    );
};

export default Snarveier;
