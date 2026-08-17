---
name: ung-innsyn-oppgaver
type: referanse
description: Arkitektur og mønster for oppgaver i ung-innsyn — fra backend-type via parseOppgaver til panelvisning og Storybook. Bruk når det skal legges til eller endres en oppgavetype, lovhenvisning eller panelpreview.
---

# ung-innsyn-oppgaver

## Bruk når

- En ny `OppgaveType` legges til i `ung-brukerdialog-api` og skal støttes i `ung-innsyn`.
- Lovhenvisninger for en oppgavetype skal legges til, endres eller rettes.
- Det skal opprettes eller oppdateres en panelkomponent, en `.mockData.ts`-fil eller en `.stories.tsx`-fil.
- Du feilsøker hvorfor riktig lovverk ikke vises i et panel (vanlig feil: feil `ytelsetype` i mock-data).
- Oversiktsstoriene (`OppgavetypeMappingUPY` / `OppgavetypeMappingAKT`) må oppdateres.

---

## Arkitekturoversikt

```
sif-api (ung-brukerdialog-api)
  └─ OppgaveType (backend-enum)
       └─ parseOppgaver.ts
            └─ ParsedOppgavetype (frontend-enum)
                 ├─ OppgavePanelX.tsx          (visningskomponent)
                 ├─ OppgavePanelX.mockData.ts  (mock-objekter brukt i stories og oversikt)
                 ├─ OppgavePanelX.stories.tsx  (individuelle Storybook-stories)
                 └─ oppgaveLovverk.ts          (lovhenvisninger per type og ytelse)
```

### Viktige filer

| Fil | Formål |
|-----|--------|
| `@navikt/ung-brukerdialog-api` (npm) | Kilde til `OppgaveType`, `OppgaveYtelsetype`, `OppgaveStatus` |
| `packages/sif-api/src/api/parse-utils/parseOppgaver.ts` | Parser backend-respons til `ParsedOppgave` med `parsedOppgavetype` |
| `packages/sif-api/src/types/Oppgave.ts` | `ParsedOppgavetype`-enum og alle oppgave-interfaces |
| `src/modules/oppgavepaneler/oppgaveLovverk.ts` | Tabeller over lovverk per `OppgaveType` og `ParsedOppgavetype` |
| `src/modules/oppgavepaneler/<type>/<Panel>.mockData.ts` | Mock-objekter (uløst + besvart) per ytelsetype |
| `src/modules/oppgavepaneler/<type>/<Panel>.stories.tsx` | Individuelle Storybook-stories under `/Aktivitetspenger` eller `/Ungdomsprogramytelsen` |
| `src/modules/oppgavepaneler/storybook/OppgavetypeMappingUPY.stories.tsx` | Oversiktstabell for UPY med ekspandert panelpreview |
| `src/modules/oppgavepaneler/storybook/OppgavetypeMappingAKT.stories.tsx` | Oversiktstabell for AKT med ekspandert panelpreview |
| `src/storybook/storyUtils.tsx` | `StoryBox`, `StateLabel`, `PanelPreviewWrapper`, `renderOppgaveStandardStater` |

---

## oppgaveLovverk.ts — lovverk-konfig

Lovhenvisninger er sentralisert i én fil med **to tabeller**:

```ts
// Per backend-OppgaveType (brukt i oversiktsstories og getLovLenker)
export const OPPGAVE_LOVVERK = {
    BEKREFT_ENDRET_STARTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_AVVIK_REGISTERINNTEKT: { UNGDOMSYTELSE: ufyFelles, AKTIVITETSPENGER: [forskriftAktivitetspenger] },
    // ...
} satisfies Record<OppgaveType, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;

// Per ParsedOppgavetype (brukt i panelkomponenter via getLovLenkerForParsedType)
export const OPPGAVE_LOVVERK_PARSED = {
    BEKREFT_ENDRET_STARTDATO: { UNGDOMSYTELSE: ufyFelles },
    BEKREFT_BOSTED: { AKTIVITETSPENGER: [forskriftAktivitetspenger] },
    BEKREFT_BOSTED_OPPHØR: { AKTIVITETSPENGER: [forskriftAktivitetspenger] },
    // ...
} satisfies Record<ParsedOppgavetype, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;
```

- `satisfies Record<OppgaveType, ...>` og `satisfies Record<ParsedOppgavetype, ...>` gir **kompileringsfeil** ved ny type uten oppdatering.
- `getLovLenker(oppgave)` — slår opp i `OPPGAVE_LOVVERK` på `oppgavetype` (backend) + `ytelsetype`.
- `getLovLenkerForParsedType(oppgave)` — slår opp i `OPPGAVE_LOVVERK_PARSED` på `parsedOppgavetype` + `ytelsetype`.
- `RegelverkOgInnsynReadMore` viser lenkene — brukes inne i `Oppgavebekreftelse` (automatisk) og manuelt i `RapporterInntektUbesvart.tsx` og `SokYtelseOppgavetekst.tsx`.

**Vanlig feil:** Lovverk vises ikke → sjekk at mock-objektet har riktig `ytelsetype`. UPY-paneler krever `OppgaveYtelsetype.UNGDOMSYTELSE`, AKT-paneler krever `OppgaveYtelsetype.AKTIVITETSPENGER`.

---

## .mockData.ts — mønsteret

`.mockData.ts`-filer eksporterer ferdiglagde mock-objekter brukt i stories og oversiktstabellen. De er **ikke** egne Storybook-stories. Typisk innhold:

```ts
// Ett mock-objekt per ytelsetype (korrekt ytelsetype-verdi er avgjørende)
export const mockEndretStartdatoUPY: EndretStartdatoOppgave = { ... };
export const mockEndretStartdatoBesvartUPY: EndretStartdatoOppgave = { ..., status: OppgaveStatus.LØST };
```

Render-logikken for oversiktsstoriene er sentralisert i `storyUtils.tsx` via `renderOppgaveStandardStater`:

```tsx
// I OppgavetypeMappingUPY.stories.tsx
renderOppgaveStandardStater(
    mockEndretStartdatoUPY,
    mockEndretStartdatoBesvartUPY,
    (oppgave, opts) => (
        <EndretStartdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />
    ),
)
```

`renderOppgaveStandardStater` rendrer automatisk: Forside (uløst), Ubesvart oppgave, Kvittering, Besvart oppgave, Forside (løst).

---

## Backend-OppgaveType → ParsedOppgavetype

`BEKREFT_ENDRET_STARTDATO` og `BEKREFT_ENDRET_SLUTTDATO` finnes nå som **egne backend-`OppgaveType`** i tillegg til å kunne komme fra `BEKREFT_ENDRET_PERIODE`. `BEKREFT_ENDRET_PERIODE` parses fortsatt til fem parsed-typer basert på `endringer`-feltet:

| ParsedOppgavetype | Backend-kilde(r) |
|---|---|
| `BEKREFT_ENDRET_STARTDATO` | `BEKREFT_ENDRET_STARTDATO` direkte, eller `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_STARTDATO]` |
| `BEKREFT_ENDRET_SLUTTDATO` | `BEKREFT_ENDRET_SLUTTDATO` (forrigeSluttdato satt), eller `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_SLUTTDATO]` + forrige finnes |
| `BEKREFT_MELDT_UT` | `BEKREFT_ENDRET_SLUTTDATO` (forrigeSluttdato mangler), eller `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_SLUTTDATO]`, ingen forrige |
| `BEKREFT_FJERNET_PERIODE` | `BEKREFT_ENDRET_PERIODE` med `endringer=[FJERNET_PERIODE]` |
| `BEKREFT_ENDRET_START_OG_SLUTTDATO` | `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_STARTDATO, ENDRET_SLUTTDATO]` |
| `BEKREFT_OPPHOR_VED_MAKSDATO` | `BEKREFT_OPPHOR_VED_MAKSDATO` direkte |
| `BEKREFT_AVVIK_REGISTERINNTEKT` | `BEKREFT_AVVIK_REGISTERINNTEKT` direkte |
| `RAPPORTER_INNTEKT` | `RAPPORTER_INNTEKT` direkte |
| `SØK_YTELSE` | `SØK_YTELSE` direkte |
| `BEKREFT_BOSTED` | `BEKREFT_BOSTED` med `oppgavetypeData.type = 'BOSTED'` |
| `BEKREFT_BOSTED_OPPHØR` | `BEKREFT_BOSTED` med `oppgavetypeData.type = 'BOSTED_OPPHØR'` |

---

## Legge til en ny oppgavetype — sjekkliste

1. **`oppgaveLovverk.ts`** — legg til ny `OppgaveType` i `OPPGAVE_LOVVERK` og ny `ParsedOppgavetype` i `OPPGAVE_LOVVERK_PARSED` (TypeScript krever dette pga. `satisfies`).
2. **`parseOppgaver.ts`** — legg til parsing for ny type, definer ny `ParsedOppgavetype` i `Oppgave.ts` ved behov.
3. **Panelkomponent** — opprett `<Type>OppgavePanel.tsx` i ny mappe under `oppgavepaneler/`.
4. **`.mockData.ts`** — opprett `<Type>OppgavePanel.mockData.ts` med mock-objekter (uløst + besvart) per ytelsetype.
5. **`.stories.tsx`** — opprett `<Type>OppgavePanel.stories.tsx` under riktig title (`Aktivitetspenger/` eller `Ungdomsprogramytelsen/`).
6. **Oversiktsstories** — importer mock-objektene og legg til rad med `renderOppgaveStandardStater` i `OppgavetypeMappingUPY` og/eller `OppgavetypeMappingAKT`.
7. **Typecheck** — kjør `pnpm --filter @sif/ung-innsyn exec tsc --noEmit`.

---

## Storybook-struktur

```
Oppgaver/
  1. Oversikt/
    Ungdomsytelse          ← OppgavetypeMappingUPY.stories.tsx
    Aktivitetspenger       ← OppgavetypeMappingAKT.stories.tsx
  Ungdomsprogramytelsen/
    <PanelNavn>            ← individuelle stories (UPY)
  Aktivitetspenger/
    <PanelNavn>            ← individuelle stories (AKT)
```

Oversiktsstoriene bruker `Table.ExpandableRow` fra Aksel — lovlenker og full panelpreview vises i ekspandert rad.

---

## Relaterte filer å inspisere

```
packages/ung-innsyn/src/modules/oppgavepaneler/
  oppgaveLovverk.ts
  storybook/OppgavetypeMappingUPY.stories.tsx
  storybook/OppgavetypeMappingAKT.stories.tsx
  <type>/<Panel>.mockData.ts
  <type>/<Panel>.stories.tsx

packages/sif-api/src/api/parse-utils/
  parseOppgaver.ts

packages/sif-api/src/types/
  Oppgave.ts               ← ParsedOppgavetype-enum og oppgave-interfaces
```
