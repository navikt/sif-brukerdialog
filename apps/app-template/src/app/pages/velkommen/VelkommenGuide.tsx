import { GuidePanel, Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Søker } from '../../types/Søker';

interface Props {
    søker: Søker;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ søker }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <FormattedMessage id="page.velkommen.guide.tittel" values={{ navn: søker.fornavn }} />
        </Heading>
        <Ingress>
            <FormattedMessage id="page.velkommen.guide.ingress" />
        </Ingress>
    </GuidePanel>
);

export default VelkommenGuide;
