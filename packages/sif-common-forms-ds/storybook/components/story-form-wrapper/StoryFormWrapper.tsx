/*
TODO: Aksel Box migration:
Could not migrate the following:
  - shadow=medium
*/

import { Box, VStack } from '@navikt/ds-react';
import SubmitPreview from '../submit-preview/SubmitPreview';

interface Props {
    children: React.ReactNode;
    values?: any;
    maxWidth?: string;
}

const StoryFormWrapper = ({ children, values, maxWidth = '35rem' }: Props) => (
    <VStack gap="space-32" maxWidth={maxWidth}>
        <Box borderRadius="4" borderWidth="1" borderColor="neutral-subtle" padding="space-24" shadow="medium">
            {children}
        </Box>
        {values && <SubmitPreview values={values} />}
    </VStack>
);

export default StoryFormWrapper;
