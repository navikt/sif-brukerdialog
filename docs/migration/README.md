# Migration Knowledge Base

## Formaal

Dette er felles kunnskapsbase for migrering av soknadsdialoger til nytt oppsett med `sif-soknad` og `sif-rhf`.

## Omfang

- Gjelder pa tvers av apper i `apps/**` og `apps-intern/**`.
- Skal inneholde korte, gjenbrukbare prinsipper og beslutninger.
- Skal ikke inneholde app-spesifikke implementasjonsdetaljer.

## Kilder

- Pilot-notater i appen: `apps/omsorgspengesoknad-v2/docs/migration-notes.md`.
- Formelle beslutninger: `docs/migration/decisions.md`.
- Agent-runbook: `.github/skills/sif-migration-baseline/SKILL.md`.

## Arbeidsflyt

1. Dokumenter funn fortlopende i pilot-notatet.
2. Flytt bekreftede monster til denne mappen.
3. Oppdater skill-filen nar fremgangsmaten er stabil.

## Prinsipper

- Hold endringer workspace-lokale.
- Prioriter adaptere framfor kopiering av kode.
- Kjor workspace-validering forst, deretter bredere sjekk ved behov.
