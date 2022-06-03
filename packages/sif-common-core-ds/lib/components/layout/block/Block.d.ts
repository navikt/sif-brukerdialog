import React, { HTMLAttributes } from 'react';
import './block.scss';
export declare type BlockMargin = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'none';
export interface BlockProps extends HTMLAttributes<HTMLDivElement> {
    margin?: BlockMargin;
    padBottom?: BlockMargin;
    textAlignCenter?: boolean;
    children: React.ReactNode;
}
declare const Block: ({ margin, padBottom, className, textAlignCenter, ...rest }: BlockProps) => JSX.Element;
export default Block;
