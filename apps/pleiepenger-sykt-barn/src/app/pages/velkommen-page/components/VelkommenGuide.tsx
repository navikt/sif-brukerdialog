import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { AppText } from '../../../i18n';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <SifGuidePanel>
        <Heading level="1" size="medium">
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>
        <Block margin="l">
            <BodyLong size="large">
                <AppText id="page.velkommen.guide.ingress" />
            </BodyLong>
        </Block>
        <p>
            <AppText id="page.velkommen.guide.tekst.1" />
        </p>
        <p>
            <AppText id="page.velkommen.guide.tekst.2" />
        </p>
    </SifGuidePanel>
);

export default VelkommenGuide;
