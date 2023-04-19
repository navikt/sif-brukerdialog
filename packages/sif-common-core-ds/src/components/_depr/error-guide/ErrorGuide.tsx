import { Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '../../block/Block';
import SifGuidePanel from '../../sif-guide-panel/SifGuidePanel';

interface Props {
    title: string;
    children: React.ReactNode;
    stillHappy?: boolean;
}

const ErrorGuide = ({ title, stillHappy, children }: Props) => (
    <SifGuidePanel poster={true} mood={stillHappy ? 'happy' : 'uncertain'}>
        <Heading level="2" size="medium">
            {title}
        </Heading>
        <Block margin="m" padBottom="l">
            {children}
        </Block>
    </SifGuidePanel>
);

export default ErrorGuide;
