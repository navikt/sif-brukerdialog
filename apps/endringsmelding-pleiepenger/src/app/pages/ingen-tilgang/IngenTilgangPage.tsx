import { BodyLong, Heading } from '@navikt/ds-react';
import React from 'react';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { SkrivTilOssLink } from '../../lenker';
import { IngenTilgangÅrsak } from '../../types/IngenTilgangÅrsak';
import { Søker } from '../../types/Søker';
import DevFooter from '../../dev/DevFooter';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { SøknadContextProvider } from '../../søknad/context/SøknadContext';
import useEffectOnce from '@navikt/sif-common-core-ds/lib/hooks/useEffectOnce';

interface Props {
    søker: Søker;
    årsak: IngenTilgangÅrsak;
}

const getÅrsakMelding = (årsak: IngenTilgangÅrsak) => {
    switch (årsak) {
        case IngenTilgangÅrsak.harUgyldigK9FormatSak:
            return (
                <BodyLong as="div" data-testid="ugyldigK9FormatSak">
                    <p>
                        Vi ser at du har en sak om pleiepenger hos oss, men foreløpig kan du ikke bruke denne tjenesten.
                        Vi jobber for å få det til, slik at du også snart kan melde fra om endring her.
                    </p>
                    <p>
                        I mellomtiden bruker du tjenesten <SkrivTilOssLink />, for å melde fra om endringer.
                    </p>
                </BodyLong>
            );

        case IngenTilgangÅrsak.harIngenPerioder:
        case IngenTilgangÅrsak.harIngenSak:
            return (
                <BodyLong as="div" data-testid="ingenSak">
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
                <BodyLong as="div" data-testid="nyttArbeidsforhold">
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
        case IngenTilgangÅrsak.harUkjentArbeidsforhold:
            return (
                <BodyLong as="div" data-testid="ukjentArbeidsforhold">
                    <p>
                        Du kan ikke bruke denne tjenesten. Dette er fordi vi ikke finner informasjon om et
                        arbeidsforhold som er i saken din. Du må derfor sende en ny søknad, slik at saken og
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
                <BodyLong as="div" data-testid="erSN">
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
                <BodyLong as="div" data-testid="flereSaker">
                    <p>
                        Du kan ikke bruke denne tjenesten per i dag. Dette er fordi tjenesten foreløpig ikke kan ta imot
                        endringer når du har pleiepenger for flere barn. Vi jobber for å få det til, og du blir også
                        tilbudt denne tjenesten på et senere tidspunkt
                    </p>
                    <p>
                        I mellomtiden bruker du tjenesten <SkrivTilOssLink />, for å melde fra om endringer.
                    </p>
                </BodyLong>
            );
    }
};

const IngenTilgangPage = ({ årsak, søker }: Props) => {
    const { logInfo } = useAmplitudeInstance();

    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);

    useEffectOnce(() => {
        logInfo({ brukerIkkeTilgang: årsak });
    });

    return (
        <SøknadContextProvider initialData={{} as any}>
            <Page title="Ingen tilgang">
                <SifGuidePanel poster={true}>
                    <Heading level="1" size="large" spacing={true} data-testid="ingen-tilgang-heading">
                        Hei {søker.fornavn}
                    </Heading>
                    {getÅrsakMelding(årsak)}
                </SifGuidePanel>
                {getEnvironmentVariable('MSW') === 'on' && <DevFooter />}
            </Page>
        </SøknadContextProvider>
    );
};

export default IngenTilgangPage;
