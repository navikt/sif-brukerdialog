import { Tag, TagProps } from '@navikt/ds-react';
import React from 'react';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    children?: React.ReactNode;
}
const EndretTag: React.FunctionComponent<Props> = (props) => {
    const { children, ...rest } = props;
    return (
        <Tag {...rest} size="small" variant={'info'}>
            {children || 'Endret'}
        </Tag>
    );
};

export default EndretTag;
