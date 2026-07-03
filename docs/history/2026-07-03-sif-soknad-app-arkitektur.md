# Arkitekturgjennomgang: `sif-soknad-app`

> Dato: 2026-07-03  
> Formål: Identifisere hva som var unødvendig komplisert, uklart eller arkitektonisk problematisk.

---

## Funn og status

| Funn | Status |
|------|--------|
| 1. [Kompleksitet] Tre draft-lag | ✅ Dokumentert i `SøknadFormValuesContext`, `useMellomlagring`, `useStepData` |
| 2. [Lekkasje] Hardkoblet til `@sif/api` | ⏭️ Ikke prioritert — monorepo-intern pakke |
| 3. [Uklarhet] Navigasjonsansvar spredt | ✅ Navigasjonstabell i `SøknadRouter` JSDoc. `søknadSendt`-navigasjon til `useSøknadSendt`. Inline-kommentarer. |
| 4. [Lekkasje] Intern store eksponert | ✅ Ny `useSøknadsdata<T>()`-hook erstatter direkte store-aksess |
| 5. [Type-svakhet] `Record<string, unknown>` | ⏭️ Delvis via `useSøknadsdata<T>()`. Full generifisering ikke prioritert. |
| 6. [Duplisering] Konsistenssjekk to ganger | ✅ Beregnes én gang i `SøknadStep`, deles via intern `SøknadStepContext` |
| 7. [Uklarhet] Layout i `SøknadStepForm` | ✅ Layout-ansvar fjernet fra rammeverket. Apper styrer layout selv. |
| 8. [Dead code] Ubrukte API-flater | ✅ `dialogs`-prop, `DialogProps` og `getLiveFormValuesForStep` fjernet |
| 9. [Kompleksitet] Modul-globals | ✅ `useRef` per instans i `SifQueryClientProvider` og `SøknadAppProvider` |
