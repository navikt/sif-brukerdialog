import React from 'react';
import './formSection.scss';
import { Heading } from '@navikt/ds-react';

interface Props {
    title: string;
    titleTag?: string;
    titleIcon?: React.ReactNode;
    children: React.ReactNode;
}

const FormSection = ({ title, titleIcon, children }: Props) => (
    <section className={'formSection'}>
        <Heading level="2" size="medium" className={'formSection__title'}>
            {titleIcon && <span className={'formSection__titleIcon'}>{titleIcon}</span>}
            {title}
        </Heading>
        <div className={'formSection__content'}>{children}</div>
    </section>
);

export default FormSection;
