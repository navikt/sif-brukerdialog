import { BodyLong, GuidePanel, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import getLenker from '../../lenker';
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
            <AppText id="page.velkommen.guide.tekst.1" values={{ Strong: (children) => <strong>{children}</strong> }} />
        </p>
        <p>
            <AppText
                id="page.velkommen.guide.tekst.2"
                values={{ Lenke: (children) => <Link href={getLenker().inntektsmelding}>{children}</Link> }}
            />
        </p>
    </GuidePanel>
);

export default VelkommenGuide;
