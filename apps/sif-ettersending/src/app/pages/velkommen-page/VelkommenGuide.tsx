import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react';
import { AppText } from '../../i18n';

interface Props {
    navn: string;
}

const VelkommenGuide = ({ navn }: Props) => (
    <GuidePanel poster={true}>
        <Heading level="2" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>
        <BodyLong size="large">
            <AppText id="page.velkommen.guide.ingress" />
        </BodyLong>
    </GuidePanel>
);

export default VelkommenGuide;
