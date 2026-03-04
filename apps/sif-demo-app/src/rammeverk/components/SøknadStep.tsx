import { Box, Heading, VStack } from '@navikt/ds-react';

interface Props {
    stepId: string;
    title: string;
    children: React.ReactNode;
}

const SøknadStep = ({ stepId, title, children }: Props) => {
    return (
        <VStack gap="space-24">
            {stepId}
            <Heading level="1" size="large">
                {title}
            </Heading>
            <Box>{children}</Box>
        </VStack>
    );
};

export default SøknadStep;
