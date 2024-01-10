import { Heading, Ingress } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <SifGuidePanel>
        <Heading level="2" size="medium">
            <FormattedMessage id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>
        <Block margin="l">
            <Ingress>
                <FormattedMessage id="page.velkommen.guide.ingress" />
            </Ingress>
        </Block>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.1" />
        </p>
        <p>
            <FormattedMessage id="page.velkommen.guide.tekst.2" />
        </p>
    </SifGuidePanel>
);

export default VelkommenGuide;
