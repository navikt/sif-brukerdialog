import { TagProps } from '@navikt/ds-react';
import React from 'react';
import { Star } from '@navikt/ds-icons';
import IconTag from './icon-tag/IconTag';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    children?: React.ReactNode;
    visIkon?: boolean;
}
const NyTag: React.FunctionComponent<Props> = (props) => {
    const { children = 'Nytt', visIkon, ...rest } = props;
    return (
        <IconTag {...rest} variant={'warning'} icon={visIkon ? <Star /> : undefined}>
            {children}
        </IconTag>
    );
};

export default NyTag;
