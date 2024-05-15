import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '../../i18n';

const VelkommenGuide: React.FunctionComponent = () => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" />
        </Heading>
        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>
    </GuidePanel>
);

export default VelkommenGuide;
