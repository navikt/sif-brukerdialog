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

| Fil                                                                      | Formål                                                                                  |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `@navikt/ung-brukerdialog-api` (npm)                                     | Kilde til `OppgaveType`, `OppgaveYtelsetype`, `OppgaveStatus`                           |
| `packages/sif-api/src/api/parse-utils/parseOppgaver.ts`                  | Registry som kobler backendens `OppgaveType` til riktig parser                          |
| `packages/sif-api/src/api/parse-utils/oppgaver/`                         | Én parser per oppgavetype, pluss felles base-, respons- og vilkårshjelpere              |
| `packages/sif-api/src/types/Oppgave.ts`                                  | `ParsedOppgavetype`-enum og alle oppgave-interfaces                                     |
| `src/modules/oppgavepaneler/oppgaveLovverk.ts`                           | Tabeller over lovverk per `OppgaveType` og `ParsedOppgavetype`                          |
| `src/modules/oppgavepaneler/<type>/<Panel>.mockData.ts`                  | Mock-objekter (uløst + besvart) per ytelsetype                                          |
| `src/modules/oppgavepaneler/<type>/<Panel>.stories.tsx`                  | Individuelle Storybook-stories under `/Aktivitetspenger` eller `/Ungdomsprogramytelsen` |
| `src/modules/oppgavepaneler/storybook/OppgavetypeMappingUPY.stories.tsx` | Oversiktstabell for UPY med ekspandert panelpreview                                     |
| `src/modules/oppgavepaneler/storybook/OppgavetypeMappingAKT.stories.tsx` | Oversiktstabell for AKT med ekspandert panelpreview                                     |
| `src/storybook/storyUtils.tsx`                                           | `StoryBox`, `StateLabel`, `PanelPreviewWrapper`, `renderOppgaveStandardStater`          |
| `apps/<ytelse>-innsyn/mock/data/oppgaver.ts`                             | DTO-mocker for demoappens oppgavescenarioer                                             |
| `apps/<ytelse>-innsyn/mock/data/varseltekster.ts`                        | Varseltekster brukt av DTO-mockene                                                      |
| `apps/<ytelse>-innsyn/mock/scenarios/{types,scenarioer}.ts`              | Scenariotype og registrering av demo-scenario                                           |
| `apps/<ytelse>-innsyn/src/demo/ScenarioHeader.tsx`                       | Eksponerer scenarioet i demoappens scenario-velger                                      |

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
    // ...
} satisfies Record<ParsedOppgavetype, Partial<Record<OppgaveYtelsetype, Lovlenke[]>>>;
```

- `satisfies Record<OppgaveType, ...>` og `satisfies Record<ParsedOppgavetype, ...>` gir **kompileringsfeil** ved ny type uten oppdatering.
- `getLovLenker(oppgave)` — slår opp i `OPPGAVE_LOVVERK` på `oppgavetype` (backend) + `ytelsetype`.
- `getLovLenkerForParsedType(oppgave)` — slår opp i `OPPGAVE_LOVVERK_PARSED` på `parsedOppgavetype` + `ytelsetype`.
- `RegelverkOgInnsynReadMore` viser lenkene — brukes inne i `Oppgavebekreftelse` (automatisk) og manuelt i `RapporterInntektUbesvart.tsx` og `SokYtelseOppgavetekst.tsx`.

**Vanlig feil:** Lovverk vises ikke → sjekk at mock-objektet har riktig `ytelsetype`. UPY-paneler krever `OppgaveYtelsetype.UNGDOMSYTELSE`, AKT-paneler krever `OppgaveYtelsetype.AKTIVITETSPENGER`.

**Vanlig feil:** `*_SCENARIO_OPTIONS`-arrayer i `.mockData.ts` dekker ikke alle verdier i årsak-/kilde-enumet. Dette gir ingen kompileringsfeil (arrayet er bare `EnumType[]`, ikke `satisfies Record<EnumType, ...>`), så det oppdages kun ved manuell sjekk mot `types.gen.ts`.

**Anbefalt mønster (kompileringssikkert):** Ikke list scenario-verdier manuelt. Legg heller `satisfies Record<EnumType, string>` på tekstoppslaget, og utled `SCENARIO_OPTIONS` fra det:

```ts
const oppgaveTekster = {
    ÅRSAK_A: '...',
    ÅRSAK_B: '...',
} satisfies Record<EnumType, string>; // kompileringsfeil hvis en verdi mangler

export const ÅRSAK_SCENARIO_OPTIONS = Object.keys(oppgaveTekster) as EnumType[];
export const KILDE_SCENARIO_OPTIONS = Object.values(KildeEnumType); // hvis alle kildeverdier alltid skal vises
```

Da blir det umulig for arrayet og enumet å komme ut av synk. Brukt i `BostedVilkar*`-mockData.

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
renderOppgaveStandardStater(mockEndretStartdatoUPY, mockEndretStartdatoBesvartUPY, (oppgave, opts) => (
    <EndretStartdatoOppgavePanel oppgave={oppgave} navn="SNODIG VAFFEL" {...opts} />
));
```

`renderOppgaveStandardStater` rendrer automatisk: Forside (uløst), Ubesvart oppgave, Kvittering, Besvart oppgave, Forside (løst).

---

## Demo-scenarioer i innsynsappene

Storybook-mocker alene gjør ikke oppgaven tilgjengelig i appens demo. Når oppgaven skal kunne velges i en innsynsapp, må hele denne kjeden oppdateres:

1. Legg til én `ScenarioType` per variant, for eksempel periode og opphør.
2. Opprett DTO-mocker i `mock/data/oppgaver.ts`. Bruk backendens `oppgavetype` og riktig diskriminator i `oppgavetypeData.type`.
3. Registrer hvert scenario i `mock/scenarios/scenarioer.ts`.
4. Legg dem til i gruppen «Oppgaver» i `src/demo/ScenarioHeader.tsx`.

**Kritisk:** `varseltekst` er valgfritt i den genererte API-typen, men obligatorisk i `parseOppgaver.ts` for bosted og oppgaver om andre livsoppholdsytelser. En DTO uten feltet gir runtime-feil og appens «Oops»-side. Hent mockteksten fra oppgavens `.mockData.ts` i `ung-innsyn`, formater datoene på samme måte som der, og legg resultatet i DTO-en.

Ved oppgaver med periode og opphør skal mockene ha separate DTO-er:

| Variant | `oppgavetypeData.type`  | Datoer         |
| ------- | ----------------------- | -------------- |
| Periode | Variantens periodeverdi | `fom` og `tom` |
| Opphør  | Variantens opphørsverdi | Kun `fom`      |

---

## Backend-OppgaveType → ParsedOppgavetype

`BEKREFT_ENDRET_STARTDATO` og `BEKREFT_ENDRET_SLUTTDATO` finnes nå som **egne backend-`OppgaveType`** i tillegg til å kunne komme fra `BEKREFT_ENDRET_PERIODE`. `BEKREFT_ENDRET_PERIODE` parses fortsatt til fem parsed-typer basert på `endringer`-feltet:

| ParsedOppgavetype                    | Backend-kilde(r)                                                                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `BEKREFT_ENDRET_STARTDATO`           | `BEKREFT_ENDRET_STARTDATO` direkte, eller `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_STARTDATO]`                                   |
| `BEKREFT_ENDRET_SLUTTDATO`           | `BEKREFT_ENDRET_SLUTTDATO` (forrigeSluttdato satt), eller `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_SLUTTDATO]` + forrige finnes  |
| `BEKREFT_MELDT_UT`                   | `BEKREFT_ENDRET_SLUTTDATO` (forrigeSluttdato mangler), eller `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_SLUTTDATO]`, ingen forrige |
| `BEKREFT_FJERNET_PERIODE`            | `BEKREFT_ENDRET_PERIODE` med `endringer=[FJERNET_PERIODE]`                                                                              |
| `BEKREFT_ENDRET_START_OG_SLUTTDATO`  | `BEKREFT_ENDRET_PERIODE` med `endringer=[ENDRET_STARTDATO, ENDRET_SLUTTDATO]`                                                           |
| `BEKREFT_OPPHOR_VED_MAKSDATO`        | `BEKREFT_OPPHOR_VED_MAKSDATO` direkte                                                                                                   |
| `BEKREFT_AVVIK_REGISTERINNTEKT`      | `BEKREFT_AVVIK_REGISTERINNTEKT` direkte                                                                                                 |
| `RAPPORTER_INNTEKT`                  | `RAPPORTER_INNTEKT` direkte                                                                                                             |
| `SØK_YTELSE`                         | `SØK_YTELSE` direkte                                                                                                                    |
| `BEKREFT_BOSTED`                     | `BEKREFT_BOSTED`, både `oppgavetypeData.type = 'BOSTED'` og `'BOSTED_OPPHØR'`                                                           |

**Vilkårsoppgavene (bosted, andre livsoppholdsytelser)** har én `ParsedOppgavetype` hver, selv om backend
skiller mellom avslag i en periode og opphør fra en dato. Grunnen er at datoene er innbakt i `varseltekst`
fra backend og utelates som egne felter i parseren — dermed har de to variantene samme parsede struktur
(samme interface og felter), men ulikt innhold i `varseltekst` (periode med fom/tom vs. opphør med kun fom).
Varianten er derfor kun synlig som ulik `varseltekst`, og dekkes i Storybook via en `varselvariant`-kontroll.

---

## Legge til en ny oppgavetype — sjekkliste

1. **`oppgaveLovverk.ts`** — legg til ny `OppgaveType` i `OPPGAVE_LOVVERK` og ny `ParsedOppgavetype` i `OPPGAVE_LOVVERK_PARSED` (TypeScript krever dette pga. `satisfies`).
2. **`parseOppgaver.ts`** — opprett en parser i `parse-utils/oppgaver/` og registrer den i `oppgaveParsers`. Registeret er `satisfies Record<OppgaveType, OppgaveParser>`, så en ny backend-type gir kompileringsfeil til den er registrert. Definer ny `ParsedOppgavetype` i `Oppgave.ts` ved behov.
3. **Panelkomponent** — opprett `<Type>OppgavePanel.tsx` i ny mappe under `oppgavepaneler/`.
4. **`.mockData.ts`** — opprett `<Type>OppgavePanel.mockData.ts` med mock-objekter (uløst + besvart) per ytelsetype. Hvis oppgavetypen har et årsak-/kilde-enum: eksporter `*_SCENARIO_OPTIONS`-arrayer som dekker **alle** verdier i det enumet (ikke bare et utvalg) — sjekk backend-enumet i `@navikt/ung-brukerdialog-api` (`types.gen.ts`) og tell antall verdier. Manglende verdier oppdages ikke av TypeScript siden `SCENARIO_OPTIONS`-arrayer ikke er `satisfies`-sjekket mot enumet, så de må verifiseres manuelt (f.eks. `grep -c "EnumNavn\." fil.ts` mot antall enum-medlemmer).
5. **`.stories.tsx`** — opprett `<Type>OppgavePanel.stories.tsx` under riktig title (`Aktivitetspenger/` eller `Ungdomsprogramytelsen/`).
6. **Oversiktsstories** — importer mock-objektene og legg til rad med `renderOppgaveStandardStater` i `OppgavetypeMappingUPY` og/eller `OppgavetypeMappingAKT`.
7. **Typecheck** — kjør `pnpm --filter @sif/ung-innsyn exec tsc --noEmit`.
8. **Verifiser enum-dekning** — for hvert årsak-/kilde-enum brukt i den nye typen: tell verdier i `types.gen.ts` og sammenlign med antall i tilhørende `*_SCENARIO_OPTIONS`-array og tekstoppslaget (f.eks. `bostedVilkårPeriodeOppgaveTekster`). Dette er lett å glemme siden kompilatoren ikke fanger det opp.
9. **Demo-scenario i aktuell innsynsapp** — legg til DTO-mocker, `ScenarioType`, scenario-registrering og valg i `ScenarioHeader`. Bruk ett scenario per diskriminert variant.
10. **Varseltekst i demo-DTO** — dersom parseren krever `varseltekst`, legg den alltid i DTO-en selv om API-typen markerer feltet som valgfritt. Hent teksten fra oppgavens `ung-innsyn`-mock og formater datoene.
11. **Verifiser innsynsappen** — kjør `pnpm --filter @navikt/<ytelse>-innsyn lint:tsc` og velg hvert nytt scenario i demoen. Dersom appen viser «Oops», kontroller først at DTO-en har riktig diskriminator og en ikke-tom `varseltekst`.

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
  mapPeriodeDto.ts
  oppgaver/                ← én parser per oppgavetype + felles hjelpere

packages/sif-api/src/types/
  Oppgave.ts               ← ParsedOppgavetype-enum og oppgave-interfaces
```
