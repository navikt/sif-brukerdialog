import { Tag, TagProps, Tooltip } from '@navikt/ds-react';
import React from 'react';
import { useAppIntl } from '../../i18n';

interface Props extends Omit<TagProps, 'variant' | 'size' | 'children'> {
    children?: React.ReactNode;
    tooltip?: string;
}

const KortUkeTag: React.FunctionComponent<Props> = ({ children, tooltip, ...rest }) => {
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
