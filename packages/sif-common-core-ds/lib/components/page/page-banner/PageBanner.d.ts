import { HeadingProps } from '@navikt/ds-react';
import React from 'react';
export declare type BannerSize = 'small' | 'large' | 'xlarge';
interface Props extends Omit<HeadingProps, 'size'> {
    size?: BannerSize;
    className?: string;
    children: React.ReactNode;
}
declare const PageBanner: ({ level, size, ...rest }: Props) => JSX.Element;
export default PageBanner;
