import React from 'react';
import CircleMask from '../circle-mask/CircleMask';

interface Props {
    illustration: React.ReactNode;
    backgroundColor?: string;
    size?: string;
}

const CircleIllustration: React.FC<Props> = ({ illustration, backgroundColor = '#99dead', size = '3.5rem' }: Props) => (
    <CircleMask size={size} color={backgroundColor} scaleSvg={false}>
        {illustration}
    </CircleMask>
);

export default CircleIllustration;
