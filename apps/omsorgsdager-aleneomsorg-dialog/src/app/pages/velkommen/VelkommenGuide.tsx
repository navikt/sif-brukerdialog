import { BodyLong, GuidePanel, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import InfoList from '@navikt/sif-common-core-ds/src/components/lists/info-list/InfoList';
import { AppText } from '../../i18n';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';

interface Props {
    navn: string;
}

const VelkommenGuide: React.FunctionComponent<Props> = ({ navn }) => (
    <GuidePanel>
        <Heading level="1" size="large" spacing={true}>
            <AppText id="page.velkommen.guide.tittel" values={{ navn }} />
        </Heading>

        <BodyLong as="div">
            <BodyLong size="large">
                <AppText id="page.velkommen.guide.ingress" />
            </BodyLong>

            <p>
                <AppText
                    id="page.velkommen.guide.tekst.1"
                    values={{
                        Lenke: (children: React.ReactNode) => (
                            <Link href={getEnvironmentVariable('OMS_IKKE_TILSYN_URL')} inlineText={true}>
                                {children}
                            </Link>
                        ),
                    }}
                />
            </p>
            <p>
                <AppText id="page.velkommen.guide.tekst.2" />
            </p>
            <p>
                <AppText id="page.velkommen.guide.tekst.3" />
            </p>
            <p>
                <strong>
                    <AppText id="page.velkommen.guide.tekst.4" />
                </strong>
            </p>
        </BodyLong>
        <InfoList>
            <li>
                <AppText id="page.velkommen.guide.tekst.4.1" />
            </li>
            <li>
                <AppText id="page.velkommen.guide.tekst.4.2" />
            </li>
            <li>
                <AppText id="page.velkommen.guide.tekst.4.3" />
            </li>
        </InfoList>
    </GuidePanel>
);

export default VelkommenGuide;
