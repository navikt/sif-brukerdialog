import { Heading } from '@navikt/ds-react';
import React, { useState } from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { guid } from '@navikt/sif-common-utils/lib';
import './formSection.less';

interface Props {
    title: string;
    titleLevel?: '1' | '2' | '3' | '4';
    titleIcon?: React.ReactNode;
    children: React.ReactNode;
}

const bem = bemUtils('formSection');

const FormSection = ({ title, titleLevel = '3', titleIcon, children }: Props) => {
    const [sectionHeaderId] = useState(guid());

    return (
        <section className={bem.block} aria-labelledby={sectionHeaderId}>
            <Heading size="large" level={titleLevel} className={bem.element('title')} id={sectionHeaderId}>
                {titleIcon && <span className={bem.element('titleIcon')}>{titleIcon}</span>}
                {title}
            </Heading>
            <div className={bem.element('content')}>{children}</div>
        </section>
    );
};

export default FormSection;
