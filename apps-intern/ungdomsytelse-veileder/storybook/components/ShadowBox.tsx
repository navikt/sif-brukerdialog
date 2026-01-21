import { Box } from '@navikt/ds-react';

const ShadowBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box borderRadius="8" borderWidth="1" borderColor="info-subtle" padding="space-24" shadow="dialog">
            {children}
        </Box>
    );
};

export default ShadowBox;
