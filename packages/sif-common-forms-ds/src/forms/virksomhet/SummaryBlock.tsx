import ContentWithHeader from '@navikt/sif-common-core-ds/src/components/content-with-header/ContentWithHeader';
import React from 'react';

interface Props {
    header: string;
    level?: '2' | '3' | '4';
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
}

const SummaryBlock = ({ header, level, children }: Props) => (
    <ContentWithHeader header={header} level={level}>
        {children}
    </ContentWithHeader>
);

export default SummaryBlock;
