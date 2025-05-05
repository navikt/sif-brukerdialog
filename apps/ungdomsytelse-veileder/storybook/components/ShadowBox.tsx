import { Box } from '@navikt/ds-react';

const ShadowBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box.New borderRadius="medium" borderWidth="1" borderColor="info-subtle" padding="6" shadow="dialog">
            {children}
        </Box.New>
    );
};

export default ShadowBox;
