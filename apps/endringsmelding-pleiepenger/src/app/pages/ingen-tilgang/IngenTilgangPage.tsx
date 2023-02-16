import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { SkrivTilOssLink } from '../../lenker';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import { Søker } from '../../types/Søker';

interface Props {
    søker: Søker;
    årsak: IngenTilgangÅrsak;
}

const getÅrsakMelding = (årsak: IngenTilgangÅrsak) => {
    switch (årsak) {
        case IngenTilgangÅrsak.harIngenPerioder:
        case IngenTilgangÅrsak.harIngenSak:
            return (
                <BodyLong as="div">
                    <p>
                        Vi finner ingen sak om pleiepenger registrert på deg, derfor kan du heller ikke bruke denne
                        tjenesten. Hvis du akkurat har sendt inn en søknad, tar det noen minutter før saken din kommer
                        opp her.
                    </p>
                    <p>
                        Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss{' '}
                        <SkrivTilOssLink />.
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harArbeidsgiverSomIkkeErISak:
            return (
                <BodyLong as="div">
                    <p>
                        Du kan ikke bruke denne tjenesten. Dette er fordi vi har funnet et arbeidsforhold på deg, som
                        ikke er registrert i pleiepengesaken din. Du må derfor sende en ny søknad, slik at saken og
                        utbetalingene dine blir riktige.
                    </p>
                    <p>
                        Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss{' '}
                        <SkrivTilOssLink />.
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende:
            return (
                <BodyLong as="div">
                    <p>
                        Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot
                        endringer fra selvstendig næringsdrivende. Vi jobber for å få det til, og selvstendig
                        næringsdrivende blir også tilbudt denne tjenesten på et senere tidspunkt.
                    </p>
                    <p>
                        I mellomtiden bruker du tjenesten <SkrivTilOssLink />, for å melde fra om endringer.
                    </p>
                </BodyLong>
            );
        case IngenTilgangÅrsak.harMerEnnEnSak:
            return (
                <BodyLong as="div">
                    <p>
                        Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot
                        endringer når du har flere pleiepengesaker. Vi jobber for å få det til, og du som har flere
                        saker blir også tilbudt denne tjenesten på et senere tidspunkt.
                    </p>
                    <p>
                        I mellomtiden bruker du tjenesten <SkrivTilOssLink />, for å melde fra om endringer.
                    </p>
                </BodyLong>
            );
    }
};

const IngenTilgangPage = ({ årsak, søker }: Props) => {
    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);
    return (
        <Page title="Ingen tilgang">
            <SifGuidePanel poster={true}>
                <Heading level="1" size="large" spacing={true} data-testid="ingen-tilgang-heading">
                    Hei {søker.fornavn}
                </Heading>
                {getÅrsakMelding(årsak)}
            </SifGuidePanel>
        </Page>
    );
};

export default IngenTilgangPage;
