import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import './soknadHeader.scss';

interface Props {
    icon?: React.ReactNode;
    title: string;
    level?: '1' | '2';
    subtitle?: string;
}

const bem = bemUtils('soknadHeader');

const SoknadHeader: React.FunctionComponent<Props> = ({ title, subtitle, level = '1', icon }) => (
    <div className={bem.block}>
        <PageBoundary>
            <div className={bem.element('content')}>
                {icon && <div className={bem.element('icon')}>{icon}</div>}
                <div className={bem.element('text')}>
                    <div className={bem.element('title')}>
                        <Heading size="small" level={level}>
                            {title}
                        </Heading>
                    </div>
                    {subtitle && (
                        <div className={bem.element('subtitle')}>
                            <BodyLong size="small">{subtitle}</BodyLong>
                        </div>
                    )}
                </div>
            </div>
        </PageBoundary>
    </div>
);

export default SoknadHeader;
