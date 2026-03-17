# Omsorgspengesoknad v2 - Migration Notes

## Maal

Migrere `apps/omsorgspengesoknad-v2` med demoappen som utgangspunkt, uten unodvendige globale endringer.

## Scope for pilot

- Inne: `apps/omsorgspengesoknad-v2`, demoapp og noedvendige pakker.
- Ute: refaktorering av andre soknader utenfor pilotens behov.

## Logg

### 2026-03-17

- Opprettet baseline for migreringsdokumentasjon.
- Avklart at vi bruker fokusert workspace i samme monorepo.

## Aapne avklaringer

- Hvilke legacy-pakker beholdes midlertidig i v2?
- Hvilke avhengigheter kan erstattes direkte med `sif-soknad` eller `sif-rhf`?

## Kandidater for generalisering

Legg inn korte punkter her nar et monster har vaert brukt minst en gang i piloten.

## Token-effektiv prompt-mal

```text
Oppgave:
[1 konkret ting du vil ha gjort]

Scope:
- Inne: apps/omsorgspengesoknad-v2/[relevante mapper/filer]
- Ute: shared refactors, andre apper, nye dependencies

Referansefiler:
- Baseline: apps/sif-demo-app/[fil]
- Legacy: apps/omsorgspengesoknad/[fil]
- Maalfil(er): apps/omsorgspengesoknad-v2/[fil]

Regler:
- Hold endringer smaa og app-lokale
- Bruk adapter i app foer endring i packages
- Ikke opprett nye markdown-filer

Leveranseformat:
- Kun dette:
1. Hva du endret (maks 5 linjer)
2. Filreferanser
3. Eventuelle blockers (kort)
- Ingen lang forklaring
```

### Eksempel (ferdig utfylt)

```text
Oppgave:
Migrer kun oppsett av form-provider i v2.

Scope:
- Inne: apps/omsorgspengesoknad-v2/src
- Ute: packages/sif-soknad, packages/sif-rhf, andre apper

Referansefiler:
- Baseline: apps/sif-demo-app/src/app/App.tsx
- Legacy: apps/omsorgspengesoknad/src/app/App.tsx
- Maalfil(er): apps/omsorgspengesoknad-v2/src/app/App.tsx

Regler:
- Hold endringer smaa og app-lokale
- Bruk adapter i app foer endring i packages
- Ikke opprett nye markdown-filer

Leveranseformat:
- Kun dette:
1. Hva du endret (maks 5 linjer)
2. Filreferanser
3. Eventuelle blockers (kort)
- Ingen lang forklaring
```
