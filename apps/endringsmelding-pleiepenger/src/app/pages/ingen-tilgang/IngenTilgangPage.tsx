import { BodyLong, Heading } from '@navikt/ds-react';
import { IngenTilgangMeta } from '@hooks';
import { SIFCommonPageKey, useAmplitudeInstance, useLogSidevisning } from '@navikt/sif-common-amplitude';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { IngenTilgangÅrsak, Søker } from '@types';
import DevFooter from '../../dev/DevFooter';
import { SkrivTilOssLink } from '../../lenker';
import { SøknadContextProvider } from '../../søknad/context/SøknadContext';
import { ANTALL_MÅNEDER_TILLATT_FOR_ENDRING } from '../../utils/endringsperiode';

export interface IngenTilgangPageProps {
    søker: Søker;
    årsak: IngenTilgangÅrsak[];
    ingenTilgangMeta?: IngenTilgangMeta;
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
        case IngenTilgangÅrsak.harArbeidsgiverUtenArbeidsaktivitet:
            return (
                <BodyLong as="div" data-testid="ukjentArbeidsforhold">
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
        case IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode:
            return (
                <BodyLong as="div" data-testid="søknadsperiodeAvsluttetFørTillattEndringsperiode">
                    <p>
                        Du kan ikke bruke denne tjenesten fordi siste søknadsperiode gikk ut for mer enn enn{' '}
                        {ANTALL_MÅNEDER_TILLATT_FOR_ENDRING} måneder siden. Du kan melde fra om endring i tjenesten{' '}
                        <SkrivTilOssLink />, eller sende oss en ny søknad.
                    </p>
                    <p>
                        Hvis du mener at dette ikke stemmer, er det fint at du sender en melding til oss{' '}
                        <SkrivTilOssLink />.
                    </p>
                </BodyLong>
            );
    }
};

const IngenTilgangPage = ({ årsak = [], søker, ingenTilgangMeta }: IngenTilgangPageProps) => {
    const { logInfo } = useAmplitudeInstance();

    useLogSidevisning(SIFCommonPageKey.ikkeTilgang);

    useEffectOnce(() => {
        logInfo({ brukerIkkeTilgang: årsak, ...ingenTilgangMeta });
    });

    return (
        <SøknadContextProvider initialData={{} as any}>
            <Page title="Ingen tilgang">
                <SifGuidePanel poster={true}>
                    <Heading level="1" size="large" spacing={true} data-testid="ingen-tilgang-heading">
                        Hei {søker.fornavn}
                    </Heading>
                    {getÅrsakMelding(årsak[0])}
                </SifGuidePanel>
                {getEnvironmentVariable('MSW') === 'on' && <DevFooter />}
            </Page>
        </SøknadContextProvider>
    );
};

export default IngenTilgangPage;
