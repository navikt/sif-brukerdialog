import { Heading } from '@navikt/ds-react';
import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import './formSection.less';

interface Props {
    title: string;
    titleLevel?: '1' | '2' | '3' | '4';
    titleIcon?: React.ReactNode;
    children: React.ReactNode;
}

const bem = bemUtils('formSection');

const FormSection = ({ title, titleLevel = '3', titleIcon, children }: Props) => (
    <section className={bem.block}>
        <Heading size="large" level={titleLevel} className={bem.element('title')}>
            {titleIcon && <span className={bem.element('titleIcon')}>{titleIcon}</span>}
            {title}
        </Heading>
        <div className={bem.element('content')}>{children}</div>
    </section>
);

export default FormSection;
