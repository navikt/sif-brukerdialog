import { Tag, TagProps } from '@navikt/ds-react';
import React from 'react';
import { Vacation } from '@navikt/ds-icons';

interface Props extends Omit<TagProps, 'variant'> {
    type?: 'fjernet' | 'registrert';
}

const FerieTag: React.FunctionComponent<Props> = (props) => {
    const { type = 'registrert', children, ...rest } = props;
    return (
        <Tag {...rest} size="small" variant={type === 'registrert' ? 'success' : 'error'}>
            <Vacation />
            <span style={{ display: 'inline-block', marginLeft: '.5rem' }}>{children}</span>
        </Tag>
    );
};

export default FerieTag;
