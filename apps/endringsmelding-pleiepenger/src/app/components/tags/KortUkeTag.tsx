import { Tag, TagProps, Tooltip } from '@navikt/ds-react';
import { useAppIntl } from '@app/i18n';
import React from 'react';

interface Props extends Omit<TagProps, 'variant' | 'size' | 'children'> {
    children?: React.ReactNode;
    tooltip?: string;
}

const KortUkeTag = ({ children, tooltip, ...rest }: Props) => {
    const { text } = useAppIntl();

    const tag = (
        <Tag variant="info" size="small" {...rest}>
            {children || text('tags.kortUke')}
        </Tag>
    );
    return tooltip ? (
        <>
            <Tooltip content={tooltip}>{tag}</Tooltip>
        </>
    ) : (
        tag
    );
};

export default KortUkeTag;
