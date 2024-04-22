import { GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '../../i18n';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>
        <p>
            <AppText id="page.velkommen.guide.ingress" />
        </p>
        <p>
            <AppText id="page.velkommen.guide.tekst.1" />
        </p>
        <p>
            <AppText id="page.velkommen.guide.tekst.2" />
        </p>
    </GuidePanel>
);

export default VelkommenGuide;
