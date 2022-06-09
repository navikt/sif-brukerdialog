import React from 'react';
import Box, { BoxMargin } from '../box/Box';

interface Props {
    id?: string;
    margin?: BoxMargin;
    paddingBottom?: BoxMargin;
    children: React.ReactNode;
}

const FormBlock = ({ margin = 'xl', paddingBottom, children, id }: Props) => (
    <Box margin={margin} padBottom={paddingBottom} id={id}>
        {children}
    </Box>
);

export default FormBlock;
