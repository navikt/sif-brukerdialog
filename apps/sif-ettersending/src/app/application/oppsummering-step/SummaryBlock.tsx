import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block, { BlockProps } from '@navikt/sif-common-core-ds/lib/components/layout/block/Block';

interface Props extends BlockProps {
    header: string;
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
}

const SummaryBlock = ({ header, children, margin = 'l' }: Props) => (
    <Block margin={margin}>
        <Heading size="small" level="3" spacing={true}>
            {header}
        </Heading>
        {children}
    </Block>
);

export default SummaryBlock;
