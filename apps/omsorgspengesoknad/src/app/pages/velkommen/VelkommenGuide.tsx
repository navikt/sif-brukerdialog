import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import { AppText } from '../../i18n';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel poster={true}>
        <Heading level="2" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>
        <BodyLong as="div">
            <p>
                <AppText id="page.velkommen.guide.ingress" />
            </p>
            <p>
                <AppText id="page.velkommen.guide.tekst.1" />
            </p>
            <p>
                <AppText id="page.velkommen.guide.tekst.2" />
            </p>
        </BodyLong>
    </GuidePanel>
);

export default VelkommenGuide;
