import React from 'react';

import Block, { BlockMargin } from '../block/Block';

interface Props {
    id?: string;
    margin?: BlockMargin;
    paddingBottom?: BlockMargin;
    children: React.ReactNode;
    ['data-testid']?: string;
}

const FormBlock = ({ margin = 'xl', paddingBottom, children, id, 'data-testid': testId }: Props) => (
    <Block margin={margin} padBottom={paddingBottom} id={id} data-testid={testId}>
        {children}
    </Block>
);

export default FormBlock;
