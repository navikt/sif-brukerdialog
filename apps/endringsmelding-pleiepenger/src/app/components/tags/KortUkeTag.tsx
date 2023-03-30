import { Tag, TagProps } from '@navikt/ds-react';
import React from 'react';

interface Props extends Omit<TagProps, 'variant' | 'size' | 'children'> {
    children?: React.ReactNode;
}

const KortUkeTag: React.FunctionComponent<Props> = ({ children, ...rest }) => {
    return (
        <Tag variant="info" size="small" {...rest}>
            {children || 'Kort uke'}
        </Tag>
    );
};

export default KortUkeTag;
