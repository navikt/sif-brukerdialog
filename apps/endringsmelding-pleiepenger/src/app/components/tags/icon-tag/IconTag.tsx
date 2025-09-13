import { Tag, TagProps } from '@navikt/ds-react';
import { ReactElement } from 'react';
import './iconTag.scss';

interface Props extends TagProps {
    icon?: ReactElement;
}

const IconTag = ({ className, icon, size = 'small', children, ...rest }: Props) => (
    <Tag {...rest} size={size} className={`${className || ' iconTag'} `}>
        {icon && <span className="iconTag__icon">{icon}</span>}
        <span className="iconTag__label">{children}</span>
    </Tag>
);

export default IconTag;
