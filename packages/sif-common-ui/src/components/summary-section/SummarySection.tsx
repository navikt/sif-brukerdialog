import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import './summarySection.scss';

interface Props {
    header: string;
    headerTag?: 'h2' | 'h3' | 'h4';
    children: React.ReactElement<any> | Array<React.ReactElement<any>> | React.ReactNode;
}

const bem = bemUtils('summarySection');

const getLevelAndSize = (headerTag: string): { level: '2' | '3' | '4'; size: 'medium' | 'small' | 'xsmall' } => {
    switch (headerTag) {
        case 'h3':
            return {
                level: '3',
                size: 'small',
            };
        case 'h4':
            return {
                level: '4',
                size: 'xsmall',
            };
        default:
            return {
                level: '2',
                size: 'medium',
            };
    }
};

const SummarySection = ({ header, headerTag = 'h2', children }: Props) => {
    const { level, size } = getLevelAndSize(headerTag);
    return (
        <div className={bem.block}>
            <Heading level={level} size={size} className={bem.element('header')}>
                {header}
            </Heading>
            <BodyLong as="div">{children}</BodyLong>
        </div>
    );
};

export default SummarySection;
