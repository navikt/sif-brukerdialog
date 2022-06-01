import React from 'react';
import bemUtils from '../../../../../src/utils/bemUtils';
import './box.scss';

export type BoxMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

interface Props {
    id?: string;
    margin?: BoxMargin;
    padBottom?: BoxMargin;
    textAlignCenter?: boolean;
    className?: string;
    children: React.ReactNode;
}

const bem = bemUtils('box');

const Box = ({ margin, padBottom, className, textAlignCenter, id, children }: Props) => {
    const classNames = bem.classNames(
        bem.block,
        bem.modifierConditional(margin, margin !== undefined),
        bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined),
        {
            [bem.modifier('textAlignCenter')]: textAlignCenter,
            [`${className}`]: className !== undefined,
        }
    );
    return (
        <div className={classNames} id={id}>
            {children}
        </div>
    );
};

export default Box;
