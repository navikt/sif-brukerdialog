import React from 'react';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/lib/components/content-with-header/ContentWithHeader';

interface Props {
    header: string;
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
}

const SummaryBlock = ({ header, children }: Props) => (
    <Block margin="l">
        <ContentWithHeader header={header}>{children}</ContentWithHeader>
    </Block>
);

export default SummaryBlock;
