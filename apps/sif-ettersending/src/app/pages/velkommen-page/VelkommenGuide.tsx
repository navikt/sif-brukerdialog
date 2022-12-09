import { Ingress, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const VelkommenGuide: React.FunctionComponent = () => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <FormattedMessage id="page.velkommen.guide.tittel" />
        </Heading>
        <Ingress>
            <FormattedMessage id="page.velkommen.guide.ingress" />
        </Ingress>
    </GuidePanel>
);

export default VelkommenGuide;
