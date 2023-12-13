import { GuidePanel, Heading, Ingress, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

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
            <FormattedMessage id="page.velkommen.guide.tekst.2" />{' '}
            <Link href={getEnvironmentVariable('OMS_IKKE_TILSYN_URL')} inlineText={true}>
                <FormattedMessage id="page.velkommen.guide.tekst.2.lenketekst" />
            </Link>
            .
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.3" />
        </p>
        <p>
            <strong>
                <FormattedMessage id="page.velkommen.guide.tekst.4" />
            </strong>
        </p>
        <InfoList>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.4.1" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.4.2" />
            </li>
            <li>
                <FormattedMessage id="page.velkommen.guide.tekst.4.3" />
            </li>
        </InfoList>
    </GuidePanel>
);

export default VelkommenGuide;
