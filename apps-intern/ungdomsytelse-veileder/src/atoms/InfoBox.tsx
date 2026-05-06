import { Box } from '@navikt/ds-react';

const InfoBox = ({ children }) => {
    return (
        <Box
            background="neutral-soft"
            paddingBlock="space-16 space-24"
            paddingInline="space-16"
            borderRadius="8"
            borderWidth="2"
            borderColor="neutral-subtle">
            {children}
        </Box>
    );
};

export const InfoBox2 = ({ children }) => {
    return (
        <Box
            background="info-soft"
            paddingBlock="space-16 space-24"
            paddingInline="space-16"
            borderRadius="8"
            borderWidth="2"
            borderColor="info-subtle">
            {children}
        </Box>
    );
};

export default InfoBox;
