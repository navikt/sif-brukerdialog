import { Box } from '@navikt/ds-react';

const ShadowBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box borderRadius="medium" borderWidth="1" borderColor="border-subtle" padding="6" shadow-xs="medium">
            {children}
        </Box>
    );
};

export default ShadowBox;
