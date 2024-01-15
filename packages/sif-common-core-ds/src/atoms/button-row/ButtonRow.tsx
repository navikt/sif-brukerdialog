import React from 'react';
import classNames from 'classnames';
import bemUtils from '../../utils/bemUtils';
import './buttonRow.scss';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    layout?: 'normal' | 'mobile-50-50' | 'stretch';
}
const bem = bemUtils('buttonRow');

const ButtonRow = ({ children, align = 'center', layout = 'normal' }: Props) => {
    const cls = classNames(bem.block, `${bem.modifier(align)}`, `${bem.modifier(layout)}`);
    return (
        <div className={cls}>
            {React.Children.map(children, (button, index) => (
                <span key={index} className={bem.element('buttonWrapper')}>
                    {button}
                </span>
            ))}
        </div>
    );
};

export default ButtonRow;
