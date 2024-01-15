import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import bemUtils from '../../../src/utils/bemUtils';
import './block.scss';

export type BlockMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

export interface BlockProps extends HTMLAttributes<HTMLDivElement> {
    margin?: BlockMargin;
    padBottom?: BlockMargin;
    textAlignCenter?: boolean;
    children: React.ReactNode;
}

const bem = bemUtils('block');

const Block = ({ margin = 'l', padBottom, className, textAlignCenter, ...rest }: BlockProps) => {
    const cls = classNames(
        bem.block,
        bem.modifierConditional(margin, margin !== undefined),
        bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined),
        {
            [bem.modifier('textAlignCenter')]: textAlignCenter,
            [`${className}`]: className !== undefined,
        },
    );
    return <div className={cls} {...rest} />;
};

export default Block;
