import { Heading, HGrid, HStack, VStack } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    header: React.ReactNode;
}

const SectionContainer = ({ header, children }: Props) => {
    return (
        <VStack gap="2">
            <HGrid columns="1fr auto" align="center">
                <Heading level="3" size="medium">
                    {header}
                </Heading>
            </HGrid>
            <HStack className="bg-gray-50 p-5 rounded-md" gap="4">
                {children}
            </HStack>
        </VStack>
    );
};

export default SectionContainer;
