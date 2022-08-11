import React from 'react';
import bemHelper from '../../utils/bemUtils';
import './banner.scss';

export type BannerSize = 'small' | 'large' | 'xlarge';

interface Props {
    size: BannerSize;
    className?: string;
    children: React.ReactNode;
}

const bem = bemHelper('banner');
const Banner = ({ size, className, children }: Props) => (
    <div className={`${bem.block} ${bem.block}--${size} ${className}`}>{children}</div>
);

export default Banner;
