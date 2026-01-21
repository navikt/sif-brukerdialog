import { BodyLong, Box, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';

interface Props {
    title: string;
    children: React.ReactNode;
}

const SoknadVelkommenGuide = ({ title, children }: Props) => (
    <GuidePanel poster={true}>
        <Box paddingBlock="space-8 space-0">
            <Heading level="2" size="medium" spacing={true}>
                {title}
            </Heading>
            <BodyLong as="div">{children}</BodyLong>
        </Box>
    </GuidePanel>
);

export default SoknadVelkommenGuide;
