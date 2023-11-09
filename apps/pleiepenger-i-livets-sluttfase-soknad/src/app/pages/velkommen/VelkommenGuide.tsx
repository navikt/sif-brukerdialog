import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <FormattedMessage id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>
        <BodyLong size="large">
            <FormattedMessage id="page.velkommen.guide.ingress" />
        </BodyLong>

        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.1" />
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.2" />
        </p>
    </GuidePanel>
);

export default VelkommenGuide;
