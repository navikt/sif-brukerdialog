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
