import { ExclamationmarkTriangleIcon, ParasolBeachIcon } from '@navikt/aksel-icons';
import { TagProps } from '@navikt/ds-react';

import IconTag from './icon-tag/IconTag';

interface Props extends Omit<TagProps, 'variant'> {
    type?: 'fjernet' | 'registrert';
}

const FerieTag = (props: Props) => {
    const { type = 'registrert', children, ...rest } = props;
    return (
        <IconTag
            {...rest}
            variant={type === 'registrert' ? 'success' : 'warning'}
            icon={
                type === 'registrert' ? (
                    <ParasolBeachIcon role="presentation" />
                ) : (
                    <ExclamationmarkTriangleIcon role="presentation" />
                )
            }>
            {children}
        </IconTag>
    );
};

export default FerieTag;
