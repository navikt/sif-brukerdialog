---
name: sif-soknad-oppsummering
description: Sett opp OppsummeringSteg i en v2-app — DTO-basert oppsummering med FormSummary, bekreftelsescheckbox og i18n-nøkler.
---

# sif-soknad-oppsummering Skill

## Formål

Fyll inn innhold i et eksisterende `OppsummeringSteg.tsx` i en v2-app. Etter at skillen er fulgt skal:

- Alle domeneseksjoner vises med `FormSummary`
- Tekstene samsvare med v1-versjonen av samme søknad
- Bekreftelsescheckbox fungere og innsending skje korrekt
- i18n-nøkler i `nb.ts` dekke alle labels

## Når skal skillen brukes

Signalord: `oppsummering`, `OppsummeringSteg`, `sett opp oppsummering`, `ny oppsummering`, `oppsummeringsside`

## Avgrensning

- Kun `OppsummeringSteg.tsx` og tilhørende `i18n/nb.ts`
- Ikke endre andre steg, søknadsdata-typer eller DTO-mapping
- For vedlegg: vis antall eller tom-advarsel — ikke bruk komponenter fra gamle pakker (`@navikt/sif-common-core-ds` o.l.)

---

## Arbeidsmodus

### Steg 1 — Les disse filene (kun disse)

1. `src/app/steps/oppsummering/OppsummeringSteg.tsx` — eksisterende skall
2. `src/app/steps/oppsummering/i18n/nb.ts` — eksisterende i18n-nøkler
3. `src/app/utils/soknadsdataToSoknadDTO.ts` — forstå DTO-strukturen
4. `src/app/types/SoknadApiData.ts` — DTO-typen
5. Tilsvarende oppsummeringsfiler i v1-appen — for tekster og rekkefølge på seksjoner

**Les ikke** andre steg, setup-filer eller packages utover dette.

### Steg 2 — Kartlegg DTO-felter

Les DTO-typen fra `SoknadApiData.ts` og `soknadsdataToSoknadDTO.ts`. Identifiser:

- Hvilke felter som alltid vises
- Hvilke felter som er optional (`?`) og skal vises betinget
- Hvilke felter som er boolean og skal vises som Ja/Nei
- Hvilke felter som er enum/union-type og trenger tekst-mapping

### Steg 3 — Hent tekstene fra v1

Finn oppsummeringstekstene i v1-appen (typisk `oppsummeringMessages.ts` eller tilsvarende). Bruk de **samme norske tekstene**, men med nye nøkkelprefikser i v2 (f.eks. `oppsummeringSteg.*` i stedet for `steg.oppsummering.*`).

---

## Struktur

Alt i én fil. Hoved-eksporten håndterer form og submit; domeneseksjonene er interne komponenter:

```
OppsummeringSteg          ← hoved-eksport, form + submit-logikk
Om<Seksjon>Oppsummering   ← intern komponent per domeneseksjon
<Enum>Tekst               ← intern komponent for enum → tekst (se under)
```

---

## Prinsipper

### Enum → tekst: bruk komponent, ikke `text()`-funksjon

En funksjon som returnerer en `AppMessageKeys`-streng vil gi TypeScript-feil fordi switch-en ikke er exhaustiv for kompilatoren. Bruk i stedet en lokal komponent med `<AppText>`:

```tsx
const RelasjonTilBarnetTekst = ({ relasjon }: { relasjon: SøkersRelasjonTilBarnet }) => {
    switch (relasjon) {
        case SøkersRelasjonTilBarnet.MOR:
            return <AppText id="omBarnetSteg.relasjon.mor" />;
        case SøkersRelasjonTilBarnet.FAR:
            return <AppText id="omBarnetSteg.relasjon.far" />;
        // ... osv.
    }
};
```

### Vedlegg

Vis antall eller tom-advarsel. Bruk `Alert` fra `@navikt/ds-react`:

```tsx
{
    vedlegg.length === 0 ? (
        <Alert inline variant="warning">
            <AppText id="oppsummeringSteg.vedlegg.ingenLastetOpp" />
        </Alert>
    ) : (
        `${vedlegg.length} vedlegg`
    );
}
```

### Feil-tilstand

Hvis DTO ikke kan bygges (`dto === undefined`), vis en `InfoCard` med advarsel og disable submit:

```tsx
submitDisabled={!dto}
```

```tsx
{
    !dto && <InfoCard data-color="warning">...</InfoCard>;
}
{
    dto && (
        <>
            <OmSøkerOppsummering søker={state.søker} />
            {/* domeneseksjoner */}
        </>
    );
}
```

### i18n-nøkler

Nøkkelprefikset for oppsummeringssteget er `oppsummeringSteg.*`. Alltid inkluder:

- `oppsummeringSteg.bekrefterOpplysninger.label`
- `oppsummeringSteg.feil.tittel` + `oppsummeringSteg.feil.innhold`
- `oppsummeringForm.validation.bekrefterOpplysninger.notChecked`

---

## Verifisering mot v1

Etter at oppsummeringen er satt opp, sjekk at innhold og rekkefølge på seksjoner er identisk med v1:

- [ ] Alle seksjoner fra v1 er representert
- [ ] Betingede felt vises/skjules likt som i v1
- [ ] Tekster (labels, overskrifter) er ordrett like v1
- [ ] Bekreftelses-tekst er identisk med v1
- [ ] Feil-tilstand (`!dto`) vises korrekt
