import { Box, VStack } from '@navikt/ds-react';

interface Props {
    children: React.ReactNode;
    values?: any;
    maxWidth?: string;
}

const StoryFormWrapper = ({ children, maxWidth = '35rem' }: Props) => (
    <VStack gap="8" maxWidth={maxWidth}>
        <Box borderRadius="medium" borderWidth="1" borderColor="border-subtle" padding="6" shadow-sm="medium">
            {children}
        </Box>
    </VStack>
);

export default StoryFormWrapper;
