---
name: ung-innsyn-oppgaver
type: referanse
description: Arkitektur og mønster for oppgaver i ung-innsyn — fra backend-type via parseOppgaver til panelvisning og Storybook. Bruk når det skal legges til eller endres en oppgavetype, lovhenvisning eller panelpreview.
---

# ung-innsyn-oppgaver

## Bruk når

- En ny `OppgaveType` legges til i `ung-brukerdialog-api` og skal støttes i `ung-innsyn`.
- Lovhenvisninger for en oppgavetype skal legges til, endres eller rettes.
- Det skal opprettes eller oppdateres en panelkomponent, en `.preview.tsx`-fil eller en `.stories.tsx`-fil.
- Du feilsøker hvorfor riktig lovverk ikke vises i et panel (vanlig feil: feil `ytelsetype` i mock-data).
- Oversiktsstoriene (`OppgavetypeMappingUPY` / `OppgavetypeMappingAKT`) må oppdateres.

---

## Arkitekturoversikt

```
sif-api (ung-brukerdialog-api)
  └─ OppgaveType (backend-enum)
       └─ parseOppgaver.ts
            └─ ParsedOppgavetype (frontend-enum)
                 ├─ OppgavePanelX.tsx         (visningskomponent)
                 ├─ OppgavePanelX.preview.tsx (mock-data + render-funksjoner for oversikt)
                 ├─ OppgavePanelX.stories.tsx (individuelle Storybook-stories)
                 └─ oppgaveLovverk.ts         (lovhenvisninger per type og ytelse)
```

### Viktige filer

| Fil | Formål |
|-----|--------|
| `@navikt/ung-brukerdialog-api` (npm) | Kilde til `OppgaveType`, `OppgaveYtelsetype`, `OppgaveStatus` |
| `packages/sif-api/src/ung-brukerdialog/parseOppgaver.ts` | Parser backend-respons til `ParsedOppgave` med `parsedOppgavetype` |
| `src/modules/oppgavepaneler/oppgaveLovverk.ts` | Kanonisk tabell over lovverk per `OppgaveType` og `OppgaveYtelsetype` |
| `src/modules/oppgavepaneler/<type>/<Panel>.preview.tsx` | Mock-data og render-funksjoner (ikke eksponert som Storybook-stories) |
| `src/modules/oppgavepaneler/<type>/<Panel>.stories.tsx` | Individuelle Storybook-stories under `/Aktivitetspenger` eller `/Ungdomsprogramytelsen` |
| `src/modules/oppgavepaneler/storybook/OppgavetypeMappingUPY.stories.tsx` | Oversiktstabell for UPY med ekspandert panelpreview |
| `src/modules/oppgavepaneler/storybook/OppgavetypeMappingAKT.stories.tsx` | Oversiktstabell for AKT med ekspandert panelpreview |
| `src/storybook/storyUtils.tsx` | `StoryBox`, `StateLabel`, `PanelPreviewWrapper` (full provider-stack) |
| `docs/oppgavetyper-oversikt.md` | Markdown-oversikt over alle oppgavetyper, parsed-typer og lovverk |

---

## oppgaveLovverk.ts — lovverk-konfig

Lovhenvisninger er sentralisert i én fil:

```ts
export const OPPGAVE_LOVVERK = {
    BEKREFT_ENDRET_STARTDATO: { UNGDOMSYTELSE: [upy_8_3_6] },
    BEKREFT_AVVIK_REGISTERINNTEKT: { UNGDOMSYTELSE: [upy_11], AKTIVITETSPENGER: [ap] },
    // ...
} satisfies Record<OppgaveType, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;
```

- `satisfies Record<OppgaveType, ...>` gir **kompileringsfeil** ved ny `OppgaveType` uten oppdatering.
- `getLovLenker(oppgave)` slår opp på `oppgave.oppgavetype` (backend-typen) **og** `oppgave.ytelsetype`.
- `RegelverkOgInnsynReadMore` viser lenkene — den brukes inne i `Oppgavebekreftelse` (automatisk) og manuelt i `RapporterInntektUbesvart.tsx` og `SokYtelseOppgavetekst.tsx`.

**Vanlig feil:** Lovverk vises ikke → sjekk at mock-objektet har riktig `ytelsetype`. UPY-paneler krever `OppgaveYtelsetype.UNGDOMSYTELSE`, AKT-paneler krever `OppgaveYtelsetype.AKTIVITETSPENGER`.

---

## .preview.tsx — mønsteret

`.preview.tsx`-filer er **ikke** egne Storybook-stories (Storybook plukker bare opp `.stories.tsx`). De eksporterer:

- `mockXxxOppgave` — én ferdig mock per ytelsetype (korrekt `ytelsetype`-verdi er avgjørende)
- `renderXxxAlleStater()` — renderfunksjon for UPY (brukt i `OppgavetypeMappingUPY`)
- `renderXxxAKTAlleStater()` — renderfunksjon for AKT (brukt i `OppgavetypeMappingAKT`), kun for delte typer

Typisk innhold i render-funksjonen:

```tsx
export const renderEndretStartdatoAlleStater = () => (
    <VStack gap="space-24">
        <StoryBox title="Forside — uløst">
            <OppgaverList oppgaver={[mockEndretStartdatoOppgave]} />
        </StoryBox>
        <StoryBox title="Ubesvart oppgave">
            <EndretStartdatoOppgavePanel oppgave={mockEndretStartdatoOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
        <StoryBox title="Kvittering">
            <EndretStartdatoOppgavePanel ... initialVisKvittering={true} />
        </StoryBox>
        <StoryBox title="Besvart oppgave">
            <EndretStartdatoOppgavePanel oppgave={besvartOppgave} navn="SNODIG VAFFEL" />
        </StoryBox>
    </VStack>
);
```

---

## BEKREFT_ENDRET_PERIODE — én backend-type, mange parsed-typer

`OppgaveType.BEKREFT_ENDRET_PERIODE` i backend parses til **fem** ulike `ParsedOppgavetype` basert på `endringer`-feltet:

| ParsedOppgavetype | Betingelse |
|---|---|
| `BEKREFT_ENDRET_STARTDATO` | kun `nyStartdato` endret |
| `BEKREFT_ENDRET_SLUTTDATO` | kun `nySluttdato` endret |
| `BEKREFT_MELDT_UT` | meldt-ut-markering |
| `BEKREFT_FJERNET_PERIODE` | periode fjernet |
| `BEKREFT_ENDRET_START_OG_SLUTTDATO` | begge datoer endret |

---

## Legge til en ny oppgavetype — sjekkliste

1. **`oppgaveLovverk.ts`** — legg til ny `OppgaveType` i `OPPGAVE_LOVVERK` (TypeScript krever dette pga. `satisfies`).
2. **`parseOppgaver.ts`** — legg til parsing for ny type, definer ny `ParsedOppgavetype` ved behov.
3. **Panelkomponent** — opprett `<Type>OppgavePanel.tsx` i ny mappe under `oppgavepaneler/`.
4. **`.preview.tsx`** — opprett `<Type>OppgavePanel.preview.tsx` med mock og render-funksjon(er).
5. **`.stories.tsx`** — opprett `<Type>OppgavePanel.stories.tsx` under riktig title (`Aktivitetspenger/` eller `Ungdomsprogramytelsen/`).
6. **Oversiktsstories** — importer render-funksjonen og legg til rad i `OppgavetypeMappingUPY` og/eller `OppgavetypeMappingAKT`.
7. **`docs/oppgavetyper-oversikt.md`** — oppdater tabellen med ny type, parsed-type og lovverk.
8. **Typecheck** — kjør `pnpm --filter @sif/ung-innsyn exec tsc --noEmit`.

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
  <type>/<Panel>.preview.tsx
  <type>/<Panel>.stories.tsx

packages/sif-api/src/ung-brukerdialog/
  parseOppgaver.ts
  Oppgave.ts               ← ParsedOppgavetype-enum

packages/ung-innsyn/docs/
  oppgavetyper-oversikt.md
```
