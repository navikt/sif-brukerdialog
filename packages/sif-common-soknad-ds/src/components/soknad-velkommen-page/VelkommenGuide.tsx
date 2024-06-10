import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ title, children }) => (
    <GuidePanel poster={true}>
        <Heading level="2" size="medium" spacing={true}>
            {title}
        </Heading>
        <BodyLong as="div">{children}</BodyLong>
    </GuidePanel>
);

export default VelkommenGuide;
