import React from 'react';
import { GuidePanel, Heading, Ingress } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <FormattedMessage id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>

        <Ingress>
            <FormattedMessage id="page.velkommen.guide.ingress" />
        </Ingress>

        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.1" />
        </p>
        <InfoList>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.1" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.2" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.3" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.4" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.1.5" />
            </li>
        </InfoList>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.2" />
        </p>
    </GuidePanel>
);

export default VelkommenGuide;
