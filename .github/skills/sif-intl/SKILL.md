---
name: sif-intl
description: Mønster for typesikker i18n (nb/nn) i apper og pakker — implementering, parametersjekk og meningssjekk.
---

# sif-intl Skill

## When to use

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

### Aggregering

- Bruk spread (`...`) for å samle meldinger fra steg/sider inn i `appMessages.ts`.
- `nn/appMessages.ts` sprer `...stegMessages_nn` og typecheckes mot `keyof typeof appMessages_nb`.
- `index.tsx` i appen sprer lib-meldinger først, så app-meldinger, så side-meldinger (senere spread vinner ved nøkkelkonflikt).

---

## Fase 1a — Implementering

Når du skal opprette eller oppdatere i18n-filer:

1. Opprett/oppdater `nb.ts` med bokmålstekster.
2. Opprett/oppdater `nn.ts` med `Record<keyof typeof ..._nb, string>` — ikke kopier nb som utgangspunkt, bruk heller spread ...nb. Da ser vi nå noen nn nøkler mangler
3. Importer og spread i riktig `appMessages.ts` (nb og nn).
4. Verifiser at `index.tsx` i appen inkluderer nn-versjon av alle kilder.
5. Sjekk at `applicationIntlMessages` eksporterer `{ nb, nn }`.

---

## Fase 1b uttrekk av tekster fra en eller flere komponenter

Når du skal trekke ut tekster som er inline i en komponent, gjør følgende:

1. Se om dette er en gruppe av komponenter som deler en naturlig felles kontekst (f.eks. et steg eller en side). Hvis ja, opprett `i18n/nb.ts` og `i18n/nn.ts` i den relevante folderen (f.eks. `steps/barn/i18n/nb.ts`).
2. Trekk ut alle tekstene fra komponentene og plasser dem i `nb.ts` med passende nøkler (f.eks. `barnSteg.tittel`, `barnSteg.spørsmål.harBarn`). Navnet på variabelen er komponentnavnet + "Messages" (f.eks. `barnStegMessages_nb`).
3. Opprett `nn.ts` med `Record<keyof typeof nb, string>` og spread `...nb` for å få en start på nn-tekster.
4. Tekstene eksporteres i `appMessages.ts` ved å spre `...barnStegMessages_nb` og `...barnStegMessages_nn`.

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
