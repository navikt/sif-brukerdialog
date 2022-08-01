import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '../../utils/bemUtils';
import './soknadHeader.scss';

interface Props {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
}

const bem = bemUtils('soknadHeader');

const SoknadHeader: React.FunctionComponent<Props> = ({ title, subtitle, icon }) => (
    <header className={bem.block}>
        <div className={bem.element('content')}>
            {icon && <div className={bem.element('icon')}>{icon}</div>}
            <div className={bem.element('text')}>
                <div className={bem.element('title')}>
                    <Heading size="medium" level="1">
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
    </header>
);

export default SoknadHeader;
