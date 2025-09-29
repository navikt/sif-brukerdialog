import { Heading } from '@navikt/ds-react';
import React from 'react';

import bemUtils from '../../utils/bemUtils';

interface Props {
    header: string;
    heading?: typeof Heading;
    level?: '1' | '2' | '3' | '4' | '5';
    size?: 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
    children: React.ReactNode;
}

const bem = bemUtils('contentWithHeader');

const ContentWithHeader = ({ header, level = '3', size = 'xsmall', children }: Props) => {
    return (
        <div className={bem.block}>
            <Heading level={level} size={size} spacing={true}>
                {header}
            </Heading>
            {children}
        </div>
    );
};

export default ContentWithHeader;
