import { Box } from '@navikt/ds-react';

const InfoBox = ({ children }) => {
    return (
        <Box background="info-moderate" paddingBlock="space-28 space-32" paddingInline="space-32" borderRadius="16">
            {children}
        </Box>
    );
};

export default InfoBox;
