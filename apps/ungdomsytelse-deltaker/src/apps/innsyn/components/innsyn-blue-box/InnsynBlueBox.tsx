import { Box } from '@navikt/ds-react';
import React from 'react';

const InnsynBlueBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box className="inline-block rounded-xl p-6" style={{ backgroundColor: '#CCE9F2', color: '#002060' }}>
            {children}
        </Box>
    );
};

export default InnsynBlueBox;
