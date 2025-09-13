import { ReadMore } from '@navikt/ds-react';
import React from 'react';
interface Props {
    children: React.ReactNode;
    title?: string;
    initialOpen?: boolean;
}

const ExpandableInfo = ({ children, initialOpen, title }: Props) => {
    return (
        <ReadMore header={title} defaultOpen={initialOpen} className="sif-read-more" data-color="accent">
            {children}
        </ReadMore>
    );
};

export default ExpandableInfo;
