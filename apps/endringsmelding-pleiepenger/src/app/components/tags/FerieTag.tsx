import { TagProps } from '@navikt/ds-react';
import React from 'react';
import { Vacation, Warning } from '@navikt/ds-icons';
import IconTag from './IconTag';

interface Props extends Omit<TagProps, 'variant'> {
    type?: 'fjernet' | 'registrert';
}

const FerieTag: React.FunctionComponent<Props> = (props) => {
    const { type = 'registrert', children, ...rest } = props;
    return (
        <IconTag
            {...rest}
            variant={type === 'registrert' ? 'success' : 'warning'}
            icon={type === 'registrert' ? <Vacation /> : <Warning />}>
            {children}
        </IconTag>
    );
};

export default FerieTag;
