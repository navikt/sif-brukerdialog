import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import classNames from 'classnames';
import './knapperad.less';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    layout?: 'normal' | 'mobile-50-50' | 'stretch';
}
const bem = bemUtils('knapperad');

const Knapperad = ({ children, align = 'center', layout = 'normal' }: Props) => {
    const cls = classNames(bem.block, `${bem.modifier(align)}`, `${bem.modifier(layout)}`);
    return (
        <div className={cls}>
            {React.Children.map(children, (knapp, index) => (
                <span key={index} className={bem.element('knapp')}>
                    {knapp}
                </span>
            ))}
        </div>
    );
};

export default Knapperad;
