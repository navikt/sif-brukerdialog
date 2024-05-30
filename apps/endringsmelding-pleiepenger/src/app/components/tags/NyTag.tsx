import { TagProps } from '@navikt/ds-react';
import React from 'react';
import { Star } from '@navikt/ds-icons';
import IconTag from './icon-tag/IconTag';
import { useAppIntl } from '../../i18n';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    children?: React.ReactNode;
    visIkon?: boolean;
}
const NyTag: React.FunctionComponent<Props> = (props) => {
    const { children, visIkon, ...rest } = props;
    const { text } = useAppIntl();
    return (
        <IconTag {...rest} variant={'warning'} icon={visIkon ? <Star /> : undefined}>
            {children || text('tags.nytt')}
        </IconTag>
    );
};

export default NyTag;
