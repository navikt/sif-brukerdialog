import { Box } from '@navikt/ds-react';
import { ReactNode } from 'react';

export const InnsynInfoBox = ({ children }: { children: ReactNode }) => {
    return (
        <Box background="brand-blue-moderateA" borderRadius={'16'} padding={'space-24'}>
            {children}
        </Box>
    );
};
