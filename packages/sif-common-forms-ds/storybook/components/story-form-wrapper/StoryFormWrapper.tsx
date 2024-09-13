import { Box, VStack } from '@navikt/ds-react';
import SubmitPreview from '../submit-preview/SubmitPreview';

interface Props {
    children: React.ReactNode;
    values?: any;
    maxWidth?: string;
}

const StoryFormWrapper = ({ children, values, maxWidth = '35rem' }: Props) => (
    <VStack gap="8" maxWidth={maxWidth}>
        <Box borderRadius="medium" borderWidth="1" borderColor="border-subtle" padding="6" shadow="medium">
            {children}
        </Box>
        {values && <SubmitPreview values={values} />}
    </VStack>
);

export default StoryFormWrapper;
