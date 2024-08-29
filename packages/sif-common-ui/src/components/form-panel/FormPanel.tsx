import { Box } from '@navikt/ds-react';

const FormPanel = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box padding="4" paddingBlock="4 6" background="bg-subtle" borderRadius="medium">
            {children}
        </Box>
    );
};

export default FormPanel;
