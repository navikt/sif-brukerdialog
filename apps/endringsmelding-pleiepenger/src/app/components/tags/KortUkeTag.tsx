import { Tag, TagProps } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '../../i18n';

interface Props extends Omit<TagProps, 'variant' | 'size' | 'children'> {
    children?: React.ReactNode;
}

const KortUkeTag: React.FunctionComponent<Props> = ({ children, ...rest }) => {
    const { text } = useAppIntl();
    return (
        <Tag variant="info" size="small" {...rest}>
            {children || text('tags.kortUke')}
        </Tag>
    );
};

export default KortUkeTag;
