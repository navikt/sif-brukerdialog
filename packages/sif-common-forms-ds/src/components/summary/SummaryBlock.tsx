import React from 'react';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';
import Block, { BlockMargin } from '@navikt/sif-common-core-ds/lib/components/block/Block';

interface Props {
    children: React.ReactNode;
    header: string;
    margin?: BlockMargin;
}

const SummaryBlock: React.FunctionComponent<Props> = ({ header, margin = 'l', children }) => (
    <Block margin={margin}>
        <ContentWithHeader header={header}>{children}</ContentWithHeader>
    </Block>
);

export default SummaryBlock;
