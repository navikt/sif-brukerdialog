import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react';
import React from 'react';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { AppText } from '../../i18n';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>

        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>

        <p>
            <AppText id="page.velkommen.guide.tekst.1" />
        </p>
        <InfoList>
            <li>
                <AppText id="page.velkommen.guide.tekst.1.1" />
            </li>
            <li>
                <AppText id="page.velkommen.guide.tekst.1.2" />
            </li>
            <li>
                <AppText id="page.velkommen.guide.tekst.1.3" />
            </li>
            <li>
                <AppText id="page.velkommen.guide.tekst.1.4" />
            </li>
            <li>
                <AppText id="page.velkommen.guide.tekst.1.5" />
            </li>
        </InfoList>
        <p>
            <AppText id="page.velkommen.guide.tekst.2" />
        </p>
    </GuidePanel>
);

export default VelkommenGuide;
