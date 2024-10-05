import { Box, Modal } from '@navikt/ds-react';

export const withModalWrapper = (Story: any) => (
    <Modal open={true} onClose={() => null} aria-labelledby="123">
        <Box padding="5">
            <Story />
        </Box>
    </Modal>
);
