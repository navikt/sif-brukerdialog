import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';

interface Props {
    header: string;
    level?: '2' | '3' | '4';
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
}

const SummaryBlock = ({ header, level, children }: Props) => (
    <Block margin="l" padBottom="m">
        <ContentWithHeader header={header} level={level}>
            {children}
        </ContentWithHeader>
    </Block>
);

export default SummaryBlock;
