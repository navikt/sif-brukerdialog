import { GuidePanel, Heading, Ingress } from '@navikt/ds-react';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
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
        <Ingress>
            <FormattedMessage id="page.velkommen.guide.ingress" />
        </Ingress>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.1" />
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.2" />
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.3" />
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.4" />
        </p>
        <p>
            <strong>
                <FormattedMessage id="page.velkommen.guide.tekst.5" />
            </strong>
        </p>
        <InfoList>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.5.1" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.5.2" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.5.3" />
            </li>
        </InfoList>
    </GuidePanel>
);

export default VelkommenGuide;
