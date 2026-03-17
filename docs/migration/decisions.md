# Migration Decisions

Korte beslutninger som skal hjelpe neste migrering.

## Hvordan skrive en beslutning

- `Beslutning`: Hva vi valgte
- `Hvorfor`: Kort begrunnelse
- `Gjenbruk i neste app`: Hva neste migrering skal gjore likt
- `Etappe` (valgfri): `sif-soknad` | `stegskjema` | `datahenting`

## Decisions

### D-001 Fokusert workspace i monorepo

- Beslutning: Vi bruker samme monorepo-checkout, men med et fokusert VS Code workspace for pilotapp + demoapp + relevante pakker.
- Hvorfor: Gir smalere kontekst for agent og utvikler uten a miste riktig dependency-graf.
- Gjenbruk i neste app: Start med eget fokus-workspace, ikke egen repo-klone.
- Etappe: sif-soknad

### D-002 Dokumentasjonsniva

- Beslutning: Felles prinsipper ligger i `docs/migration`, mens app-spesifikke notater ligger i appens egen `docs`-mappe.
- Hvorfor: Reduserer stoy i fellesdokumentasjon og forenkler senere generalisering.
- Gjenbruk i neste app: Skriv lopende notater lokalt, flytt kun verifiserte monster til felles beslutninger.
- Etappe: sif-soknad

### D-003 Adapter-forst for legacy-avhengigheter

- Beslutning: Vi bruker adaptere i appen for legacy-avhengigheter forst, og bytter til `sif-soknad`/`sif-rhf` trinnvis.
- Hvorfor: Reduserer risiko, holder endringer lokale i pilotappen og minimerer paavirkning pa ikke-migrerte apper.
- Gjenbruk i neste app: Start med en liten adapterflate i appen, erstatt implementasjon bak adapter etter hvert.
- Etappe: datahenting

### D-004 Etappevis migrering uten fast rekkefolge

- Beslutning: Vi migrerer i etapper (`sif-soknad`, `stegskjema`, `datahenting`), men velger rekkefolge per app.
- Hvorfor: Apper har ulik kompleksitet, ulik avhengighetsflate og ulike risikoer.
- Gjenbruk i neste app: Velg start-etappe basert pa lavest risiko og hoyest laeringsverdi i den aktuelle appen.
