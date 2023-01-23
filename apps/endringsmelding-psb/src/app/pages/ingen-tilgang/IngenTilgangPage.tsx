import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import { Søker } from '../../types/Søker';
import { BodyLong, Heading } from '@navikt/ds-react';

interface Props {
    søker: Søker;
    årsak: IngenTilgangÅrsak;
}

const getÅrsakMelding = (årsak: IngenTilgangÅrsak) => {
    switch (årsak) {
        case IngenTilgangÅrsak.finnerIkkeTidsperiode:
        case IngenTilgangÅrsak.harIngenSaker:
            return (
                <BodyLong as="div">
                    <p>Vi kan ikke finne noen sak om pleiepenger på deg.</p>
                    <p>Dersom dette ikke stemmer, ta kontakt med [TODO].</p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harMerEnnEnSak:
            return (
                <BodyLong as="div">
                    <p>
                        Du kan desverre ikke bruke denne løsningen for å sende inn melding om endring enda. Løsningen
                        støtter kun dem som har én sak, og vi ser at du har flere saker.
                    </p>
                    <p>
                        Vi har valgt å lage løsningen for dem som har kun én sak til å begynne med, fordi de fleste har
                        kun én sak, og vi ønsker å tilby løsningen så fort som mulig, og heller utvide etter hvert. Det
                        å støtte dem med flere saker, står høyt på listen over hva vi ønsker å utvide med.
                    </p>
                    <p>TODO: Hvor melde endringer</p>
                </BodyLong>
            );
    }
};

const IngenTilgangPage = ({ årsak, søker }: Props) => {
    return (
        <Page title="Ingen tilgang">
            <SifGuidePanel poster={true}>
                <Heading level="1" size="large" spacing={true}>
                    Hei {søker.fornavn}
                </Heading>
                {getÅrsakMelding(årsak)}
            </SifGuidePanel>
        </Page>
    );
};

export default IngenTilgangPage;
