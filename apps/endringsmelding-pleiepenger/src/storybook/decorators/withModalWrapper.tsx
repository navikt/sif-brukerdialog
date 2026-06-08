import { Box, Modal } from '@navikt/ds-react';

export const withModalWrapper = (Story: any) => (
    <Modal open={true} onClose={() => null} aria-labelledby="123">
        <Box padding="space-20">
            <Story />
        </Box>
    </Modal>
);
