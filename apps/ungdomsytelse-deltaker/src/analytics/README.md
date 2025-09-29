# Analytics Logging

Denne mappen inneholder analytics-funksjonalitet for ungdomsytelse-deltaker appen. Analytics-systemet logger brukerinteraksjoner og hendelser for å forbedre tjenesten.

## Oversikt over loggede hendelser

### Skjema-hendelser

#### `logSkjemaStartet`

- **Når**: Bruker starter søknadsprosessen
- **Hvor**: `SøknadContext.tsx` - når bruker godtar rettigheter og plikter
- **Data**: Skjemanavn (`UngdomsytelseDeltakerApp.key`)

#### `logSkjemaFullført`

- **Når**: Søknad eller oppgavebekreftelse sendes inn
- **Hvor**:
    - `SøknadContext.tsx` - ved fullført søknad
    - `UløstOppgavebekreftelse.tsx` - ved oppgavebekreftelse
- **Data**:
    - **Søknad**: Omfattende metadata om deltakelse, barn, kontonummer, oppgaver og responstid
    - **Oppgavebekreftelse**: Oppgavetype, responstid, om bruker la til uttalelse

#### `logSkjemaFeilet`

- **Når**: Søknadsinnsending mislykkes
- **Hvor**: `OppsummeringSteg.tsx` - ved feil under innsending
- **Data**: Skjemanavn (`DeltakerSkjemaId.SØKNAD`)

### Applikasjonshendelser

#### `logHendelse` - Avbryt

- **Når**: Bruker avbryter søknaden
- **Hvor**: `SøknadContext.tsx` - ved "avbryt og slett"
- **Data**: `ApplikasjonHendelse.avbryt`

#### `logHendelse` - Er ikke deltaker

- **Når**: Ingen deltakelsesperioder finnes for bruker
- **Hvor**: `DeltakerInfoLoader.tsx`
- **Data**: `ApplikasjonHendelse.erIkkeDeltaker`

#### `logHendelse` - Har flere deltakelser

- **Når**: Bruker har flere deltakelsesperioder (ikke støttet)
- **Hvor**: `DeltakerInfoLoader.tsx`
- **Data**: `ApplikasjonHendelse.harFlereDeltakelser`

### API-feil

#### `logApiError` - Oppstartsinfo

- **Når**: Feil ved lasting av søker- eller deltakelsesdata
- **Hvor**: `DeltakerInfoLoader.tsx`
- **Data**: `ApiError.oppstartsinfo` med feildetaljer

## Metadata som logges

### Søknadsinnsending (logUtils.getSøknadInnsendingMeta)

```typescript
{
  harBarn: boolean,
  barnStemmer: boolean,
  harKontonummer: boolean,
  kontonummerStemmer?: boolean,
  harStartet: boolean,
  harSluttdato: boolean,
  antallOppgaverTotalt: number,
  antallEndretStartdatoOppgaver: number,
  antallEndretSluttdatoOppgaver: number,
  antallSøkYtelseOppgaver: number,
  antallDagerMellomOpprettetOgBesvart: number,
  antallMinutterMellomOpprettetOgBesvart: number
}
```

### Oppgavebekreftelse (logUtils.getOppgaveBekreftelseMeta)

```typescript
{
  oppgavetype: Oppgavetype,
  antallDagerMellomOpprettetOgBesvart: number,
  antallMinutterMellomOpprettetOgBesvart: number,
  harUttalelse: boolean
}
```

### Deltakelsesperiode-metadata (logUtils.getDeltakelsePeriodeMeta)

```typescript
{
  harSøkt: boolean,
  harStartet: boolean,
  erAvsluttet: boolean,
  antallOppgaverTotalt: number,
  antallLøsteOppgaver: number,
  antallUløsteOppgaver: number,
  antallAvbrutteOppgaver: number,
  antallLukkedeOppgaver: number,
  harSluttdato: boolean,
  antallEndretStartdatoOppgaver: number,
  antallEndretSluttdatoOppgaver: number,
  antallAvvikRegisterinntektOppgaver: number,
  antallRapporterInntektOppgaver: number,
  antallSøkYtelseOppgaver: number,
  antallDagerSidenStartdato: number,
  antallDagerMellomInnmeldtOgSøknad?: number
}
```

## Analytics-system

Appen bruker NAV Dekoratørens analytics-system via `@navikt/nav-dekoratoren-moduler`.

## Konfigurerte hendelsestyper

- `AnalyticsEvents.skjemaStartet` - "skjema startet"
- `AnalyticsEvents.skjemaSendt` - "skjema fullført"
- `AnalyticsEvents.skjemaFeilet` - "skjemainnsending feilet"
- `AnalyticsEvents.applikasjonHendelse` - "applikasjon-hendelse"
- `AnalyticsEvents.apiError` - "api-error"
- `AnalyticsEvents.applikasjonInfo` - "applikasjon-info"
