import { TagProps } from '@navikt/ds-react';
import { Vacation, Warning } from '@navikt/ds-icons';
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
            icon={type === 'registrert' ? <Vacation role="presentation" /> : <Warning role="presentation" />}>
            {children}
        </IconTag>
    );
};

export default FerieTag;
