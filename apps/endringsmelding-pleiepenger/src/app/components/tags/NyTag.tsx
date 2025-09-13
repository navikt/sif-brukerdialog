import { TagProps } from '@navikt/ds-react';
import React from 'react';
import { Star } from '@navikt/ds-icons';
import { useAppIntl } from '../../i18n';
import IconTag from './icon-tag/IconTag';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    children?: React.ReactNode;
    visIkon?: boolean;
}
const NyTag = (props: Props) => {
    const { children, visIkon, ...rest } = props;
    const { text } = useAppIntl();
    return (
        <IconTag {...rest} variant="warning" icon={visIkon ? <Star /> : undefined}>
            {children || text('tags.nytt')}
        </IconTag>
    );
};

export default NyTag;
