# Brainstorm - Prinsipper for intl filer

-   Typesikring av alle tekstnøkler?
-   Definert nær bruk, i steder for felles eller globale filer?
-   Bruke react-intl for formatering av tall, dato, plural etc?
-   Ikke bygge opp deler av streng, hvor react-intl har funksjonalitet som løser dette (f.eks. lenker, bold)?
-   Skille mellom enkle tekster og infotekster?

### Oversetting

-   Oversiktlig format
    -   Mest mulig komplette setninger
-   Konstruerte tekster (fortid/fremtid, valideringsmeldinger)?
    -   Lage system for alt?
-   Oversetter må forstå kontekst
    -   oversetter har forståelse for ytelse?
    -   skjermbilder/storybook? Per komponent/per side/annet?
-   Avgrense til kun endret tekst
-   Etablerte begreper på tvers av applikasjoner?
    -   Ordliste over begreper?

## Testing

-   Test for å verifisere at alle tekster finnes på begge målformer?
-   Automatisk testing?
-   Manglende tekster sendes til console - kan det logges på en god måte fra prod?

## Utvikling

-   Ved komponenter med tekst fra andre pakker (f.eks. sif-common-forms-ds), er det kanskje greit at disse må importeres spesifikt. Vil bli fanget opp under test.
