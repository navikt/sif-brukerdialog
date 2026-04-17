---
name: sif-intl
description: Mønster for typesikker i18n (nb/nn) i apper og pakker — implementering, parametersjekk og meningssjekk.
---

# sif-intl

## Når skal skillen brukes

- Du skal legge til eller endre tekster i en app eller pakke.
- Du skal opprette ny `i18n/nb.ts` eller `i18n/nn.ts`.
- Du trenger å verifisere at `{param}`-variabler er like i nb og nn.
- Du skal vurdere om meningen i nb- og nn-tekster er ekvivalente.
- Du arbeider med `AppText`, `useAppIntl`, `useSifXxxIntl`, `applicationIntlMessages`.
- Du skal trekke ut tekster fra en komponent eller sett med komponenter

---

## Arkitektur

Mønsteret er delt i to kontekster:

### Pakker (f.eks. `@sif/soknad-ui`)

```
src/
  i18n/
    index.tsx          ← samler nb, nn; eksporterer hooks, komponent og messages
    nb.ts              ← (alternativt aggregert via side-spesifikke filer)
  pages/
    my-page/
      i18n/
        nb.ts          ← kilde for meldinger i denne siden/komponenten
        nn.ts          ← typed mot nb-objektet, garanterer full dekning
```

**Eksempel `nb.ts` (pakke, side-spesifikk):**

```ts
export const stepPageMessages_nb = {
    '@sifSoknadUi.stepFooter.fortsettSenere.trigger.label': 'Lagre og fortsett senere',
    '@sifSoknadUi.stepFooter.slettSøknad.dialog.text.1':
        'Informasjonen du har fylt ut blir slettet, og du kommer tilbake til velkomstsiden.',
};
```

**Eksempel `nn.ts` (pakke):**

```ts
import { stepPageMessages_nb } from './nb';

export const stepPageMessages_nn: Record<keyof typeof stepPageMessages_nb, string> = {
    '@sifSoknadUi.stepFooter.fortsettSenere.trigger.label': 'Lagre og hald fram seinare',
    '@sifSoknadUi.stepFooter.slettSøknad.dialog.text.1':
        'Informasjonen du har fylt ut vert sletta, og du kjem tilbake til velkomstsida.',
};
```

**`i18n/index.tsx` (pakke):**

```tsx
import { typedIntlHelper } from '@navikt/sif-common-utils';
import { FormattedMessage, useIntl } from 'react-intl';
import { stepPageMessages_nb } from '../pages/step-page/i18n/nb';
import { stepPageMessages_nn } from '../pages/step-page/i18n/nn';

const nb = {
    ...stepPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...stepPageMessages_nn,
};

type SifSoknadUiMessageKeys = keyof typeof nb;

export const useSifSoknadUiIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<SifSoknadUiMessageKeys>(intl);
};

interface SifSoknadUiTextProps {
    id: SifSoknadUiMessageKeys;
    values?: any;
}

export const SifSoknadUiText = (props: SifSoknadUiTextProps) => {
    return <FormattedMessage {...props} />;
};

export const sifSoknadUiMessages = {
    nb,
    nn,
};
```

---

### Apper (f.eks. `aktivitetspenger-soknad`)

```
src/app/
  i18n/
    index.tsx          ← samler lib-meldinger + app-meldinger; eksporterer AppText, useAppIntl
    nb/
      appMessages.ts   ← aggregerer steg- og domain-meldinger
    nn/
      appMessages.ts   ← Record<keyof typeof appMessages_nb, string>
  pages/
    velkommen/
      i18n/
        nb.ts          ← side-spesifikke nb-tekster
        nn.ts          ← Record<keyof typeof velkommenPageMessages_nb, string>
  steps/
    barn/
      i18n/
        nb.ts          ← steg-spesifikke nb-tekster
        nn.ts          ← Record<keyof typeof barnStegMessages_nb, string>
```

**Eksempel `nb.ts` (steg, med param og HTML-tag):**

```ts
export const barnStegMessages_nb = {
    'barnSteg.tittel': 'Barn',
    'barnSteg.spørsmål.harBarn': 'Stemmer opplysningen om {antallBarn, plural, one {barnet} other {barna}}?',
    'barnSteg.opplysninger.info.text':
        'Du må være registrert som forelder ... <Lenke>kontakt med Skatteetaten</Lenke>.',
};
```

**Eksempel `nn.ts` (steg):**

```ts
import { barnStegMessages_nb } from './nb';

export const barnStegMessages_nn: Record<keyof typeof barnStegMessages_nb, string> = {
    'barnSteg.tittel': 'Barn',
    'barnSteg.spørsmål.harBarn': 'Stemmer opplysninga om {antallBarn, plural, one {barnet} other {barna}}?',
    'barnSteg.opplysninger.info.text': 'Du må vere registrert som forelder ... <Lenke>kontakt Skatteetaten</Lenke>.',
};
```

**`i18n/nb/appMessages.ts`:**

```ts
import { barnStegMessages_nb } from '../../steps/barn/i18n/nb';

export const appMessages_nb = {
    ...barnStegMessages_nb,
    'application.title': 'Søknad om aktivitetspenger',
};
```

**`i18n/nn/appMessages.ts`:**

```ts
import { barnStegMessages_nn } from '../../steps/barn/i18n/nn';
import { appMessages_nb } from '../nb/appMessages';

export const appMessages_nn: Record<keyof typeof appMessages_nb, string> = {
    ...barnStegMessages_nn,
    'application.title': 'Søknad om aktivitetspengar',
};
```

**`i18n/index.tsx` (app):**

```tsx
import { typedIntlHelper } from '@navikt/sif-common-utils';
import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { FormattedMessage, useIntl } from 'react-intl';
import { velkommenPageMessages_nb } from '../pages/velkommen/i18n/nb';
import { velkommenPageMessages_nn } from '../pages/velkommen/i18n/nn';
import { appMessages_nb } from './nb/appMessages';
import { appMessages_nn } from './nn/appMessages';

const libMessages = {
    nb: { ...sifSoknadUiMessages.nb },
    nn: { ...sifSoknadUiMessages.nn },
};

const nb = {
    ...libMessages.nb,
    ...appMessages_nb,
    ...velkommenPageMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...libMessages.nn,
    ...appMessages_nn,
    ...velkommenPageMessages_nn,
};

export type AppMessageKeys = keyof typeof nb;

export const useAppIntl = () => {
    const intl = useIntl();
    return typedIntlHelper<AppMessageKeys>(intl);
};

export type AppIntlShape = ReturnType<typeof useAppIntl>;

interface AppTextProps {
    id: AppMessageKeys;
    values?: any;
}

export const AppText = (props: AppTextProps) => {
    return <FormattedMessage {...props} />;
};

export const applicationIntlMessages = {
    nb,
    nn,
};
```

---

## Regler og konvensjoner

### Regler for copy og tekstendringer

- AI skal ikke finne på, skrive om eller forbedre brukervendte tekster på egen hånd.
- Når oppgaven er å flytte, trekke ut eller strukturere tekster, skal tekstinnholdet beholdes uendret.
- Nye tekster skal bare legges inn når teksten er eksplisitt oppgitt av bruker, finnes i eksisterende kildefil, eller kommer fra etablert copy.
- Hvis nødvendig tekstgrunnlag mangler, stopp og be om teksten i stedet for å dikte den.
- Ved migrering eller refaktorering er hovedregelen at eksisterende tekster skal være identiske før og etter endringen.

### Nøkkelstruktur

| Kontekst   | Prefiks-konvensjon | Eksempel                                    |
| ---------- | ------------------ | ------------------------------------------- |
| Pakke      | `@pkgName.`        | `@sifSoknadUi.stepFooter.slettSøknad.label` |
| Side (app) | `page.pageName.`   | `page.velkommen.guide.tittel`               |
| Steg (app) | `stepName.`        | `barnSteg.tittel`                           |
| App-nivå   | fritt              | `application.title`                         |

### nn.ts-typing

`nn` skal alltid types mot `nb` med `Record<keyof typeof ..._nb, string>`. Dette sikrer:

- TS-feil ved manglende nøkler i nn
- TS-feil ved nøkler i nn som ikke finnes i nb
- Full dekning garantert av typesystemet

### Manglende nynorsk-oversettelse

Hvis nynorsk ikke finnes eller ikke er levert av en oversetter, **spread `nb` uten å oversette selv**:

```ts
import { myMessages_nb } from './nb';

export const myMessages_nn: Record<keyof typeof myMessages_nb, string> = {
    ...myMessages_nb,
};
```

**Aldri** lag nynorsk-tekster ved hjelp av AI-oversettelse. Nynorsk skal komme fra et menneske eller en offisiell oversetter.

### Bruk av komponent vs. hook

Velg basert på om teksten er en **JSX-node (children)** eller en **string-prop**:

| Kontekst                                                 | Bruk                              | Eksempel                                     |
| -------------------------------------------------------- | --------------------------------- | -------------------------------------------- |
| JSX text node (children)                                 | `<AppText>` / `<SifSoknadUiText>` | `<Heading><AppText id="tittel" /></Heading>` |
| String-prop (aria-label, title, label, placeholder o.l.) | `text()` fra hook                 | `aria-label={text('lukk.label')}`            |

```tsx
export const MyComponent = () => {
    const { text } = useAppIntl();
    return (
        <Button aria-label={text('myBtn.ariaLabel')}>
            <AppText id="myBtn.label" />
        </Button>
    );
};
```

### Aggregering

- Bruk spread (`...`) for å samle meldinger fra steg/sider inn i `appMessages.ts`.
- `nn/appMessages.ts` sprer `...stegMessages_nn` og typecheckes mot `keyof typeof appMessages_nb`.
- `index.tsx` i appen sprer lib-meldinger først, så app-meldinger, så side-meldinger (senere spread vinner ved nøkkelkonflikt).

### Eksport fra pakker

**En pakke eksporterer kun det aggregerte meldings-objektet** — aldri de individuelle underfilene.

- `i18n/index.tsx` eksporterer `xyzMessages` (aggregert `{ nb, nn }`). Dette er det eneste konsumenter trenger.
- Sub-modul-filer som `modules/oppgaver/avvik-registerinntekt/i18n/nb.ts` skal **ikke** eksporteres fra pakkens `index.ts` — de er implementasjonsdetaljer.
- Årsak: Konsumenter importerer én samlet meldings-blob og registrerer den i sin `IntlProvider`. De trenger ikke vite hvilke underfiler meldingene kom fra.

```ts
// ✅ Riktig — pakken eksporterer kun aggregert
export { xyzMessages } from './i18n'; // { nb, nn }

// ❌ Feil — eksponerer intern struktur
export { avvikRegisterinntektMessages_nb } from './modules/oppgaver/avvik-registerinntekt/i18n/nb';
```

---

## Fase 0 — Pre-flight (utled filstier uten søk)

Filstiene er **deterministiske** og avledes direkte fra komponent- eller stegnavnet. Ikke søk bredt i kodebasen — les de kjente filene direkte i parallell.

### Steg-komponent i en app

Gitt en komponent i `steps/<steg-mappenavn>/`, les følgende fire filer i parallell:

| Fil                                          | Formål                                |
| -------------------------------------------- | ------------------------------------- |
| `steps/<steg-mappenavn>/<StegComponent>.tsx` | Komponentfilen med hardkodede tekster |
| `steps/<steg-mappenavn>/i18n/nb.ts`          | Eksisterende nb-nøkler for steget     |
| `steps/<steg-mappenavn>/i18n/nn.ts`          | Eksisterende nn-nøkler for steget     |
| `i18n/nb/appMessages.ts`                     | Bekrefter steg-modulen er registrert  |

Eksempel: For `AndreYtelserSteg.tsx` i `steps/andre-ytelser/`, les:

- `steps/andre-ytelser/AndreYtelserSteg.tsx`
- `steps/andre-ytelser/i18n/nb.ts`
- `steps/andre-ytelser/i18n/nn.ts`
- `i18n/nb/appMessages.ts`

### Side-komponent i en app

Gitt en komponent i `pages/<side-mappenavn>/`, les:

| Fil                                          | Formål                                        |
| -------------------------------------------- | --------------------------------------------- |
| `pages/<side-mappenavn>/<PageComponent>.tsx` | Komponentfilen med hardkodede tekster         |
| `pages/<side-mappenavn>/i18n/nb.ts`          | Eksisterende nb-nøkler for siden              |
| `pages/<side-mappenavn>/i18n/nn.ts`          | Eksisterende nn-nøkler for siden              |
| `i18n/index.tsx`                             | Bekrefter siden er inkludert i app-meldingene |

### Pakke-komponent

Gitt en komponent i `src/<type>/<komponent>/`, les:

| Fil                                      | Formål                                               |
| ---------------------------------------- | ---------------------------------------------------- |
| `src/<type>/<komponent>/<Component>.tsx` | Komponentfilen med hardkodede tekster                |
| `src/<type>/<komponent>/i18n/nb.ts`      | Eksisterende nb-nøkler                               |
| `src/<type>/<komponent>/i18n/nn.ts`      | Eksisterende nn-nøkler                               |
| `src/i18n/index.tsx`                     | Bekrefter komponenten er registrert i pakke-messages |

> **Regel:** Hvis alle fire filene leses i parallell i én batch, har du all nødvendig kontekst. Ikke gjør ytterligere søk.

---

## Fase 1a — Implementering

Når du skal opprette eller oppdatere i18n-filer:

1. Opprett/oppdater `nb.ts` med eksisterende eller eksplisitt levert bokmålstekst, uten omskriving.
2. Opprett/oppdater `nn.ts` med `Record<keyof typeof ..._nb, string>` — ikke kopier nb som utgangspunkt, bruk heller spread ...nb. Da ser vi nå noen nn nøkler mangler
3. Importer og spread i riktig `appMessages.ts` (nb og nn).
4. Verifiser at `index.tsx` i appen inkluderer nn-versjon av alle kilder.
5. Sjekk at `applicationIntlMessages` eksporterer `{ nb, nn }`.

Hvis oppgaven gjelder uttrekk fra hardkodede tekster i komponenter, skal `nb.ts` gjengi nøyaktig samme tekst som stod i komponenten før uttrekket.

---

## Fase 1b uttrekk av tekster fra en eller flere komponenter

### Steg 1 — Inventar alle komponenter parallelt

Les alle aktuelle komponentfiler i én parallell `read_file`-batch. Formålet er å lage en komplett liste over inline tekster FØR du oppretter noen filer.

For hvert steg som skal ekstraheres, les hovedkomponenten (f.eks. `BostedForm.tsx`, `OppsummeringSteg.tsx`).

Fra hver fil, noter alle hardkodede tekster:

- **String-props:** `legend="..."`, `aria-label="..."`, `title="..."`, `placeholder="..."`
- **Template literals i props:** ``legend={`Tekst ${x}?`}`` → i18n-nøkkel med `{param}`
- **Same-line JSX children:** `<Heading>Tekst</Heading>`, `<SifInfoCard>Tekst</SifInfoCard>`
- **Multi-line JSX children:** tekst som står på egen linje mellom åpnings- og lukketag

**Hva som IKKE skal ekstraheres:**

- Komponent-props som er enums/konstanter (f.eks. `variant="warning"`, `size="small"`)
- Tekst som allerede er i18n (f.eks. `text('nøkkel')` eller `<AppText id="..." />`)
- TODO-kommentarer i JSX

**Effektivisering:** Bruk én parallell `read_file`-batch for alle steg. Samle alle funn i en mental tabell (`steg → nøkkel → tekst`) før du går videre til steg 2.

### Steg 2 — Opprett alle i18n-filer

For hvert steg med inline tekster:

1. Opprett `i18n/nb.ts` og `i18n/nn.ts` i stegets folder (f.eks. `steps/bosted/i18n/nb.ts`).
2. Trekk ut alle tekstene fra komponentene og plasser dem i `nb.ts` med passende nøkler (f.eks. `barnSteg.tittel`, `barnSteg.spørsmål.harBarn`). Navnet på variabelen er komponentnavnet + "Messages" (f.eks. `barnStegMessages_nb`).
3. Opprett `nn.ts` med `Record<keyof typeof nb, string>` og spread `...nb` — **ikke oversett tekstene til nynorsk**. Nynorsk-oversettelse gjøres manuelt av utvikler i etterkant.
4. **For pakker:** importer og spread `_nb`-variabelen i pakkens `i18n/index.tsx` (i `nb`-objektet), slik at meldingene eksporteres via `sifSoknadUiMessages` / `applicationIntlMessages`. Uten dette steget er meldingene ikke tilgjengelige i konsumerende apper.
    - Importer og spread også `_nn`-variabelen i `nn`-objektet **bare hvis den inneholder faktiske nynorsk-oversettelser** (dvs. ikke er kun `{ ...nb }`). Hvis `nn.ts` bare er et spread av `nb`, er `...nb` i `nn` allerede tilstrekkelig — ikke legg til redundant import.
5. Tekstene eksporteres i `appMessages.ts` ved å spre `...barnStegMessages_nb` og `...barnStegMessages_nn`.

### Steg 3 — Oppdater alle komponenter (batch)

Bruk `multi_replace_string_in_file` for å oppdatere ALLE komponenter i én operasjon.

Regelen for **hook vs. komponent**:

- **String-props** (legend, aria-label, title, placeholder) → `text('nøkkel')` fra hook
- **JSX children** → `<AppText id="nøkkel" />` komponent

For **hver** komponent som oppdateres:

- Legg til `import { AppText, useAppIntl } from '@app/i18n';` — utelat `useAppIntl` om kun children brukes, utelat `AppText` om kun string-props brukes
- Legg til `const { text } = useAppIntl();` kun hvis `text()` brukes

```tsx
// String-prop → hook
<YesOrNoQuestion
    name={Field.borITrondheim}
    legend={text('bostedSteg.spørsmål.borITrondheim')}
/>

// Template literal med param → hook
<YesOrNoQuestion
    legend={text('kontonummerSteg.spørsmål.kontonummerErRiktig', { kontonummer: info.kontonummer })}
/>

// JSX children → komponent
<Heading><AppText id="bostedUtlandSteg.bosteder.tittel" /></Heading>
<Button><AppText id="bostedUtlandSteg.bosteder.leggTil" /></Button>
<Checkbox validate={...}>
    <AppText id="oppsummeringSteg.bekrefterOpplysninger.label" />
</Checkbox>
```

### Komponent vs. hook i komponenten som oppdateres

Erstatt hardkodede tekster etter regelen:

- JSX children → `<AppText id="...">` / `<SifSoknadUiText id="..." />`
- String-props (aria-label, label, title, placeholder, fallback i logikk) → `text('...')` fra hook

```tsx
// JSX node → komponent
<Heading><SifSoknadUiText id="@ui.myComponent.heading" /></Heading>

// String-prop → hook
<Input aria-label={text('@ui.myComponent.inputLabel')} />

// Fallback i children → komponent (siden children er en node)
{propLabel || <SifSoknadUiText id="@ui.myComponent.defaultLabel" />}
```

## Fase 2 — Parametersjekk

Verifiserer at `{param}`-variabler er identiske mellom nb og nn for samme nøkkel.

**Fremgangsmåte:**

1. Les nb-filen og nn-filen side om side.
2. For hver nøkkel: ekstraher alle `{...}`-forekomster fra nb-verdien.
3. Sammenlign mot nn-verdien for samme nøkkel.
4. Rapporter avvik i følgende format:

```
PARAMETER MISMATCH
  Nøkkel: barnSteg.spørsmål.harBarn
  nb:  {antallBarn, plural, one {barnet} other {barna}}
  nn:  {antallBarn}          ← mangler plural-form
```

**Hva som sjekkes:**

- Manglende `{param}` i nn som finnes i nb
- Ekstra `{param}` i nn som ikke finnes i nb
- ICU-plural-former (`plural`, `select`) som avviker
- `<TagName>...</TagName>` HTML-tags som mangler eller er feilstavet i nn

**Tip:** Bruk grep-mønsteret `\{[^}]+\}` for å finne alle parametre i en tekstverdi.

---

## Fase 3 — Meningssjekk

Semantisk vurdering av om nb og nn uttrykker det samme innholdet.

**Fremgangsmåte:**

1. Les nb og nn for den aktuelle filen/steg-gruppen.
2. Gå gjennom nøkkel for nøkkel og vurder:
    - Betyr setningene det samme?
    - Er tone og formalitetsnivå likt?
    - Er lenketekster eller handlingsfraser ekvivalente?
    - Er noe utelatt eller tillagt i nn?
3. Rapporter avvik per nøkkel:

```
MENINGSAVVIK
  Nøkkel: personopplysninger.2
  nb:  "Vi innhenter og mottar opplysninger om deg når vi skal behandle saken din.
        Det er nødvendig for at du skal få riktig tjeneste. Saken din kan behandles automatisk."
  nn:  "Vi hentar opplysningar om deg."
  Problem: nn mangler "behandles automatisk" og "riktig tjeneste" — juridisk viktig informasjon.
  Forslag: Legg til "Saka di kan handsamast automatisk." og "for at du skal få rett teneste."
```

**Hva som sjekkes:**

- Utelatt faktainnhold (tall, datoer, juridiske begreper)
- Endre betydning (f.eks. "kan" vs "skal")
- Utelatelse av handlingsoppfordringer eller lenker
- Tone-avvik (særlig formell vs. uformell)

---

## Kildereferanser

- App: `apps/aktivitetspenger-soknad/src/app/i18n/index.tsx`
- App-meldinger: `apps/aktivitetspenger-soknad/src/app/i18n/nb/appMessages.ts`
- Side-meldinger: `apps/aktivitetspenger-soknad/src/app/pages/velkommen/i18n/nb.ts` / `nn.ts`
- Steg-meldinger: `apps/aktivitetspenger-soknad/src/app/steps/barn/i18n/nb.ts`
- Pakke: `packages/sif-soknad-ui/src/i18n/index.tsx`
- Pakke-meldinger: `packages/sif-soknad-ui/src/pages/step-page/i18n/nb.ts`