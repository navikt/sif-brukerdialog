import { TagProps } from '@navikt/ds-react';
import React from 'react';
import { Edit } from '@navikt/ds-icons';
import IconTag from './icon-tag/IconTag';
import { useAppIntl } from '../../i18n';

interface Props extends Omit<TagProps, 'variant' | 'children'> {
    children?: React.ReactNode;
    visIkon?: boolean;
}
const EndretTag: React.FunctionComponent<Props> = (props) => {
    const { children, visIkon, ...rest } = props;
    const { text } = useAppIntl();
    return (
        <IconTag {...rest} variant={'info'} icon={visIkon ? <Edit /> : undefined}>
            {children || text('tags.endret')}
        </IconTag>
    );
};

export default EndretTag;
