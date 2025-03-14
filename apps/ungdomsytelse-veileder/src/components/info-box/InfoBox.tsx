import { Box } from '@navikt/ds-react';
import React from 'react';

interface Props {
    visible?: boolean;
    children: React.ReactNode;
}

const InfoBox = ({ visible, children }: Props) => {
    if (!visible) {
        return null;
    }
    return (
        <Box className="p-6 pt-8 pb-8 bg-deepblue-50 w-full rounded-md">
            <Box maxWidth="800px">{children}</Box>
        </Box>
    );
};
export default InfoBox;
