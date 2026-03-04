import { Box, Heading, VStack } from '@navikt/ds-react';

interface Props {
    title: string;
    children: React.ReactNode;
}

const SøknadStep = ({ title, children }: Props) => {
    return (
        <VStack gap="space-24">
            <Heading level="1" size="large">
                {title}
            </Heading>
            <Box>{children}</Box>
        </VStack>
    );
};

export default SøknadStep;
