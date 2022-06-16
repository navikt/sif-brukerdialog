import { Heading, HeadingProps } from '@navikt/ds-react';
import React from 'react';

export type BannerSize = 'small' | 'large' | 'xlarge';

interface Props extends Omit<HeadingProps, 'size'> {
    size?: BannerSize;
    className?: string;
    children: React.ReactNode;
}

const getBannerSizeClass = (size: BannerSize) => {
    switch (size) {
        case 'small':
            return 'min-h-[3.5rem]';
        case 'large':
            return 'min-h-[8rem]';
        case 'xlarge':
            return 'min-h-[12rem]';
    }
};

const PageBanner = ({ level = '2', size = 'small', ...rest }: Props) => (
    <div
        className={`bg-purple-200 flex items-center justify-center text-center p-1 sm:p-2 md:p-4 ${getBannerSizeClass(
            size
        )}`}>
        <Heading level={level} {...rest} size="medium" />
    </div>
);

export default PageBanner;
