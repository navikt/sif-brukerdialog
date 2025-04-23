import { Heading, HGrid, VStack } from '@navikt/ds-react';

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
            <VStack className="bg-gray-50 p-5 rounded-md" gap="4">
                {children}
            </VStack>
        </VStack>
    );
};

export default SectionContainer;
