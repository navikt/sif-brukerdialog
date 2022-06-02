import React, { HTMLAttributes } from 'react';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import './block.scss';

export type BlockMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';

export interface BlockProps extends HTMLAttributes<HTMLDivElement> {
    margin?: BlockMargin;
    padBottom?: BlockMargin;
    textAlignCenter?: boolean;
    children: React.ReactNode;
}

const bem = bemUtils('box');

const Block = ({ margin = 'l', padBottom, className, textAlignCenter, ...rest }: BlockProps) => {
    const classNames = bem.classNames(
        bem.block,
        bem.modifierConditional(margin, margin !== undefined),
        bem.modifierConditional(`bottom-${padBottom}`, padBottom !== undefined),
        {
            [bem.modifier('textAlignCenter')]: textAlignCenter,
            [`${className}`]: className !== undefined,
        }
    );
    return <div className={classNames} {...rest} />;
};

export default Block;
