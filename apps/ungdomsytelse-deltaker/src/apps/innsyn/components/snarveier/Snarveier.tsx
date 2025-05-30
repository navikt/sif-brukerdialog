import { BodyLong, HGrid, LinkPanel, VStack } from '@navikt/ds-react';
import getLenker from '../../../../utils/lenker';
import UngdomsprogrammetHeader from '../ungdomsprogrammet-header/UngdomsprogrammetHeader';

const Snarveier = () => {
    return (
        <HGrid columns="1fr auto">
            <VStack gap="6" marginBlock="8 10">
                <UngdomsprogrammetHeader />

                <BodyLong>
                    Et fulltidsprogram for deg mellom 18 og 29 år som trenger ekstra oppfølging for å komme i jobb. Når
                    du deltar i ungdomsprogrammet, kan du søke om å få penger gjennom ungdomsprogramytelsen.
                </BodyLong>

                <HGrid columns={{ sm: '1fr 1fr' }} gap="4">
                    <LinkPanel
                        border={false}
                        style={{ borderRadius: '0.5rem' }}
                        href={getLenker().omUngdomsprogramytelsen}>
                        Om ungdoms&shy;programmet
                    </LinkPanel>
                    <LinkPanel border={false} style={{ borderRadius: '0.5rem' }} href={getLenker().skrivtilOss}>
                        Still spørsmål om ytelsen
                    </LinkPanel>
                </HGrid>
            </VStack>
        </HGrid>
    );
};

export default Snarveier;
