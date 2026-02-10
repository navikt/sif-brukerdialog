import { Box } from '@navikt/ds-react';

const InfoBox = ({ children }) => {
    return (
        <Box
            background="neutral-soft"
            paddingBlock="space-16"
            paddingInline="space-16"
            borderRadius="8"
            borderWidth="2"
            borderColor="neutral-subtle">
            {children}
        </Box>
    );
};

export default InfoBox;
