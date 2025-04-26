import { BoxNew, Heading, HGrid, VStack } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    header: React.ReactNode;
}

const SectionContainer = ({ header, children }: Props) => {
    return (
        <VStack gap="4">
            <HGrid columns="1fr auto" align="center">
                <Heading level="3" size="medium">
                    {header}
                </Heading>
            </HGrid>
            <BoxNew background="info-soft" padding="5" borderRadius={'medium'}>
                <VStack gap="4">{children}</VStack>
            </BoxNew>
        </VStack>
    );
};

export default SectionContainer;
