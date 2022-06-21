import React from 'react';
import Block, { BlockMargin } from '../block/Block';

interface Props {
    id?: string;
    margin?: BlockMargin;
    paddingBottom?: BlockMargin;
    children: React.ReactNode;
}

const FormBlock = ({ margin = 'xl', paddingBottom, children, id }: Props) => (
    <Block margin={margin} padBottom={paddingBottom} id={id}>
        {children}
    </Block>
);

export default FormBlock;
