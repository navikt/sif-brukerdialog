import { GuidePanel, Heading, Ingress, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import getLenker from '../../lenker';

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
            <FormattedMessage id="page.velkommen.guide.tekst.1.1" />
            <strong>
                <FormattedMessage id="page.velkommen.guide.tekst.1.2" />
            </strong>
            <FormattedMessage id="page.velkommen.guide.tekst.1.3" />
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.2.1" />
            <Link href={getLenker().inntektsmelding}>
                <FormattedMessage id="page.velkommen.guide.tekst.2.2" />
            </Link>
            <FormattedMessage id="page.velkommen.guide.tekst.2.3" />
        </p>
    </GuidePanel>
);

export default VelkommenGuide;
