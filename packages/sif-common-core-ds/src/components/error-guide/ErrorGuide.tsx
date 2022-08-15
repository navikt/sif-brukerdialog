import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '../block/Block';
import Guide from '../guide/Guide';
import VeilederSVG from '../veileder-svg/VeilederSVG';

interface Props {
    title: string;
    children: React.ReactNode;
    stillHappy?: boolean;
}

const ErrorGuide = ({ title, stillHappy, children }: Props) => (
    <Guide
        type="plakat"
        kompakt={true}
        fargetema="normal"
        svg={<VeilederSVG mood={stillHappy ? 'happy' : 'uncertain'} />}>
        <Heading level="2" size="medium">
            {title}
        </Heading>
        <Block margin="m" padBottom="l">
            {children}
        </Block>
    </Guide>
);

export default ErrorGuide;
