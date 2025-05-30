import { BodyShort, Heading, HGrid, LinkPanel, VStack } from '@navikt/ds-react';
import getLenker from '../../../../utils/lenker';

const Snarveier = () => {
    return (
        <HGrid columns="1fr auto">
            <VStack gap="2" marginBlock="0 10">
                <Heading level="2" size="large">
                    Har du noen spørsmål?
                </Heading>
                <BodyShort>Her er noen snarveier som kan være nyttige.</BodyShort>

                {/* <Show below="md">
                    <HStack justify="center" marginBlock="4 0">
                        <Box maxWidth="16rem">
                            <SnarveierDameSVG size="fullWidth" />
                        </Box>
                    </HStack>
                </Show> */}

                <VStack gap="4" marginBlock="3 0" maxWidth="30rem">
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
            {/* <Show above="md">
                <HStack justify="end">
                    <Bleed marginInline="0 20">
                        <SnarveierDameSVG />
                    </Bleed>
                </HStack>
            </Show> */}
        </HGrid>
    );
};

export default Snarveier;
