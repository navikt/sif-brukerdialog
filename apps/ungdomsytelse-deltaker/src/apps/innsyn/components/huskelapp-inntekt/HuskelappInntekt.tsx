import { Heading, HGrid, VStack } from '@navikt/ds-react';
import InnsynBlueBox from '../innsyn-blue-box/InnsynBlueBox';

const HuskelappInntekt = () => (
    <InnsynBlueBox>
        <HGrid align="center" columns={{ md: 'auto 1fr' }} gap="8">
            <VStack>
                <Heading as="div" level="2" size="medium" style={{ fontWeight: '300' }}>
                    Husk å melde fra mellom 1. - 6. hver måned hvis du starter å jobbe og får utbetalt lønn mens du er i
                    ungdoms&shy;programmet.
                </Heading>
                {/* <Hide above="md">
                    <HStack justify="center">
                        <Box maxWidth="200px" marginBlock="4 0">
                            <HandsIll size="fullWidth" />
                        </Box>
                    </HStack>
                </Hide> */}
            </VStack>
            {/* <Show above="md">
                <div>
                    <HandsIll />
                </div>
            </Show> */}
        </HGrid>
    </InnsynBlueBox>
);

export default HuskelappInntekt;
